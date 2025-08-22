import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetDashboardDataQuery } from "../../redux/slices/dashboardApiSlice";
import IncomeExpenseSavingBarChart from "./components/IncomeExpenseSavingBarChart";
import IncomeExpenseSavingLineChart from "./components/IncomeExpenseSavingLineChart";
import MetricCard from "./components/MetricCard";
import IncomeExpenseSavingPieChart from "./components/IncomeExpenseSavingPieChart";

export default function Home() {
  const [IncomeExpenseSaving, setIncomeExpenseSaving] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setIncomeExpenseSaving(data.IncomeExpenseSavingDataset);
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
          <MetricCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
          <MetricCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
          <MetricCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingLineChart dataset={IncomeExpenseSaving} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingBarChart dataset={IncomeExpenseSaving} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingPieChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <IncomeExpenseSavingPieChart />
        </Grid>
      </Grid>
    </Box>
  );
}
