import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BarChart from "./dashboard/components/BarChart";
import PieChart from "./dashboard/components/PieChart";
import { useGetDashboardDataQuery } from "../redux/slices/dashboardApiSlice";

export default function Home() {
  const [incomeDataset, setIncomedataset] = React.useState([]);
  const [expenseDataset, setExpensedataset] = React.useState([]);
  const [savingDataset, setSavingDataset] = React.useState([]);
  const [transactionDataset, setTransactionDataset] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setExpensedataset(data.monthlyExpenseData);
      setIncomedataset(data.monthlyIncomeData);
      setSavingDataset(data.monthlySavingData);
      setTransactionDataset(data.monthlyTransactionData);
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
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <BarChart
            dataset={incomeDataset}
            yAxisDataKey={"month"}
            seriesDataKey={"totalIncome"}
            label={"Monthly total income"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <BarChart
            dataset={expenseDataset}
            yAxisDataKey={"month"}
            seriesDataKey={"totalExpense"}
            label={"Monthly total expense"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <BarChart
            dataset={savingDataset}
            yAxisDataKey={"month"}
            seriesDataKey={"totalSaving"}
            label={"Monthly total saving"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <BarChart
            dataset={transactionDataset}
            yAxisDataKey={"month"}
            seriesDataKey={"totalTransaction"}
            label={"Monthly total transaction"}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  );
}
