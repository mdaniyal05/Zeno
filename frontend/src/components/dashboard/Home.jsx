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
  const [IncomeExpenseSavingBarchart, setIncomeExpenseSavingBarchart] =
    React.useState([]);
  const [
    dailyIncomeExpenseSavingLinechart,
    setDailyIncomeExpenseSavingLineChart,
  ] = React.useState([]);
  const [activeBudgetPieChart, setActiveBudgetPiechart] = React.useState([]);
  const [
    totalIncomeExpenseSavingPiechart,
    setTotalIncomeExpenseSavingPiechart,
  ] = React.useState([]);
  const [netBalance, setNetBalance] = React.useState("");
  const [savingsRate, setSavingsRate] = React.useState("");
  const [budgetUtilization, setBudgetUtilization] = React.useState("");
  const [insights, setInsights] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setIncomeExpenseSavingBarchart(data.IncomeExpenseSavingDataset);
      setDailyIncomeExpenseSavingLineChart(
        data.dailyIncomeExpenseSavingDataset
      );
      setActiveBudgetPiechart(data.activeBudgetDataset);
      setNetBalance(data.netBalance);
      setSavingsRate(data.savingsRate);
      setBudgetUtilization(data.budgetUtilization);
      setInsights(data.insights);

      if (
        data.totalIncomeExpenseSavingDataset[0]?.value === 0 &&
        data.totalIncomeExpenseSavingDataset[1]?.value === 0 &&
        data.totalIncomeExpenseSavingDataset[2]?.value === 0
      ) {
        setTotalIncomeExpenseSavingPiechart([]);
      } else {
        setTotalIncomeExpenseSavingPiechart(
          data.totalIncomeExpenseSavingDataset
        );
      }
    }
  }, [data]);

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
          <IncomeExpenseSavingLineChart
            dataset={dailyIncomeExpenseSavingLinechart}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingBarChart dataset={IncomeExpenseSavingBarchart} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <ActiveBudgetPieChart dataset={activeBudgetPieChart} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <TotalIncomeExpenseSavingPieChart
            dataset={totalIncomeExpenseSavingPiechart}
          />
        </Grid>
        {insights.map((insight, index) => (
          <Grid size={{ xs: 12, sm: 4, lg: 2 }} key={index}>
            <MetricCard title={"🧐"} value={""} caption={insight} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
