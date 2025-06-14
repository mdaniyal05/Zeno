import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StatCard from "./dashboard/components/StatCard";
import { useGetAllUserIncomesQuery } from "../redux/slices/incomeApiSlice";
import { useGetAllUserExpensesQuery } from "../redux/slices/expenseApiSlice";

export default function Home() {
  const [incomes, setIncomes] = React.useState([]);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [expenses, setExpenses] = React.useState([]);
  const [totalExpense, setTotalExpense] = React.useState(0);

  const { data: income } = useGetAllUserIncomesQuery();
  const { data: expense } = useGetAllUserExpensesQuery();

  React.useEffect(() => {
    let incomeAmounts = [];
    let expenseAmounts = [];
    let incomeTotal = 0;
    let expenseTotal = 0;

    if (income && expense) {
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
  }, [income, expense]);

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
            title={"Incomes"}
            value={totalIncome}
            interval={"Last 30 Days"}
            trend={"down"}
            data={incomes}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Expenses"}
            value={totalExpense}
            interval={"Last 30 Days"}
            trend={"up"}
            data={expenses}
          />
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Incomes"}
            value={totalIncome}
            interval={"Last 20 Days"}
            trend={"down"}
            data={incomes}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <StatCard
            title={"Incomes"}
            value={totalIncome}
            interval={"Last 20 Days"}
            trend={"down"}
            data={incomes}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}
