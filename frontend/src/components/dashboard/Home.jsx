import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetDashboardDataQuery } from "../../redux/slices/dashboardApiSlice";
import IncomeExpenseSavingBarChart from "./components/IncomeExpenseSavingBarChart";
import IncomeExpenseSavingLineChart from "./components/IncomeExpenseSavingLineChart";
import MetricCard from "./components/MetricCard";
import ActiveBudgetPieChart from "./components/ActiveBudgetPieChart";
import TotalIncomeExpenseSavingPieChart from "./components/TotalIncomeExpenseSavingPieChart";

export default function Home() {
  const [IncomeExpenseSaving, setIncomeExpenseSaving] = React.useState([]);
  const [activeBudget, setActiveBudget] = React.useState([]);
  const [totalIncomeExpenseSaving, setTotalIncomeExpenseSaving] =
    React.useState([]);
  const [netBalance, setNetBalance] = React.useState("");
  const [savingsRate, setSavingsRate] = React.useState("");
  const [budgetUtilization, setBudgetUtilization] = React.useState("");
  const [insights, setInsights] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setIncomeExpenseSaving(data.IncomeExpenseSavingDataset);
      setActiveBudget(data.activeBudgetDataset);
      setTotalIncomeExpenseSaving(data.totalIncomeExpenseSavingDataset);
      setNetBalance(data.netBalance);
      setSavingsRate(data.savingsRate);
      setBudgetUtilization(data.budgetUtilization);
      setInsights(data.insights);
    }
  }, [data]);

  console.log(insights);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
          <MetricCard title={"💰"} value={netBalance} caption={"Net Balance"} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
          <MetricCard
            title={"📈"}
            value={`${savingsRate} %`}
            caption={"Savings Rate"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
          <MetricCard
            title={"💸"}
            value={`${budgetUtilization} %`}
            caption={"Budget Utilization"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingLineChart dataset={IncomeExpenseSaving} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingBarChart dataset={IncomeExpenseSaving} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <ActiveBudgetPieChart dataset={activeBudget} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <TotalIncomeExpenseSavingPieChart
            dataset={totalIncomeExpenseSaving}
          />
        </Grid>
        {insights.map((insight) => (
          <Grid size={{ xs: 12, sm: 4, lg: 2 }}>
            <MetricCard title={"🧐"} value={""} caption={insight} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
