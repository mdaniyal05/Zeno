import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./dashboard/components/StatCard";
import { useGetAllUserIncomesQuery } from "../redux/slices/incomeApiSlice";
import { useGetAllUserExpensesQuery } from "../redux/slices/expenseApiSlice";
import { useGetAllUserAccountsQuery } from "../redux/slices/bankAccountApiSlice";
import { useGetAllUserTransactionsQuery } from "../redux/slices/transactionApiSlice";

export default function Home() {
  const [incomes, setIncomes] = React.useState([]);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [expenses, setExpenses] = React.useState([]);
  const [totalExpense, setTotalExpense] = React.useState(0);
  const [balances, setBalances] = React.useState([]);
  const [totalBalances, setTotalBalances] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [totalTransactions, setTotalTransactions] = React.useState(0);

  const { data: income } = useGetAllUserIncomesQuery();
  const { data: expense } = useGetAllUserExpensesQuery();
  const { data: balance } = useGetAllUserAccountsQuery();
  const { data: transaction } = useGetAllUserTransactionsQuery();

  React.useEffect(() => {
    let incomeAmounts = [];
    let expenseAmounts = [];
    let balanceAmounts = [];
    let transactionAmounts = [];
    let incomeTotal = 0;
    let expenseTotal = 0;
    let balanceTotal = 0;
    let transactionTotal = 0;

    if (income && expense && balance && transaction) {
      transaction.transactionsData.map((transaction) =>
        transactionAmounts.push(transaction.transactionAmount)
      );
      setTransactions(transactionAmounts);

      transaction.transactionsData.map(
        (transaction) =>
          (transactionTotal = transactionTotal + transaction.transactionAmount)
      );
      setTotalTransactions(transactionTotal);

      balance.accountsData.map((balance) =>
        balanceAmounts.push(balance.accountBalance)
      );
      setBalances(balanceAmounts);

      balance.accountsData.map(
        (balance) => (balanceTotal = balanceTotal + balance.accountBalance)
      );
      setTotalBalances(balanceTotal);

      income.incomesData.map((income) =>
        incomeAmounts.push(income.incomeAmount)
      );
      setIncomes(incomeAmounts);

      income.incomesData.map(
        (income) => (incomeTotal = incomeTotal + income.incomeAmount)
      );
      setTotalIncome(incomeTotal);

      expense.expensesData.map((expense) =>
        expenseAmounts.push(expense.expenseAmount)
      );
      setExpenses(expenseAmounts);

      expense.expensesData.map(
        (expense) => (expenseTotal = expenseTotal + expense.expenseAmount)
      );
      setTotalExpense(expenseTotal);
    }
  }, [income, expense, balance, transaction]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Total Incomes"}
            value={totalIncome}
            interval={"Last 30 Days"}
            trend={"neutral"}
            data={incomes}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Total Expenses"}
            value={totalExpense}
            interval={"Last 30 Days"}
            trend={"neutral"}
            data={expenses}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Total Accounts Balance"}
            value={totalBalances}
            interval={"Last 30 Days"}
            trend={"neutral"}
            data={balances}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Total Transactions"}
            value={totalTransactions}
            interval={"Last 30 Days"}
            trend={"neutral"}
            data={transactions}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
