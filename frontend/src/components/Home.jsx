import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IncomeBarChart from "./dashboard/components/IncomeBarChart";
import ExpenseLineChart from "./dashboard/components/ExpenseLineChart";

export default function Home() {
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
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          <IncomeBarChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
          <ExpenseLineChart />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}></Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}></Grid>
      </Grid>
    </Box>
  );
}
