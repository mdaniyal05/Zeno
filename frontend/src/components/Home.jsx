import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Piechart from "./dashboard/components/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetDashboardDataQuery } from "../redux/slices/dashboardApiSlice";

const chartSettingHorizontal = {
  xAxis: [{ label: "Amount" }],
  height: 500,
  margin: { left: 0 },
};

const chartSettingVertical = {
  yAxis: [{ label: "Amount" }],
  height: 500,
};

function valueFormatter(value) {
  return `${value} Amount`;
}

export default function Home() {
  const [pieDataset, setPieDataset] = React.useState([]);
  const [vsDataset, setVsDataset] = React.useState([]);
  const [budgetDataset, setBudgetDataset] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setPieDataset(data.pieChartData);
      setVsDataset(data.barChartData);
      setBudgetDataset(data.currentBudgetDataset);
    }
  }, [data]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography
        component="h2"
        variant="h2"
        sx={{ mb: 10, textAlign: "center" }}
      >
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Total Monthly Income VS Total Monthly Saving VS Total Monthly
            Expense
          </Typography>
          <BarChart
            dataset={vsDataset}
            xAxis={[{ scaleType: "band", dataKey: `month` }]}
            series={[
              {
                dataKey: `totalIncome`,
                label: `Monthly total income`,
                valueFormatter,
              },
              {
                dataKey: `totalExpense`,
                label: `Monthly total expense`,
                valueFormatter,
              },
              {
                dataKey: `totalSaving`,
                label: `Monthly total saving`,
                valueFormatter,
              },
            ]}
            layout="vertical"
            grid={{ horizontal: true }}
            {...chartSettingVertical}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Total Monthly Income VS Total Monthly Expense
          </Typography>
          <BarChart
            dataset={vsDataset}
            yAxis={[{ scaleType: "band", dataKey: `month` }]}
            series={[
              {
                dataKey: `totalIncome`,
                label: `Monthly total income`,
                valueFormatter,
              },
              {
                dataKey: `totalExpense`,
                label: `Monthly total expense`,
                valueFormatter,
              },
            ]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSettingHorizontal}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Total Monthly Expense VS Total Monthly Saving
          </Typography>
          <BarChart
            dataset={vsDataset}
            yAxis={[{ scaleType: "band", dataKey: `month` }]}
            series={[
              {
                dataKey: `totalExpense`,
                label: `Monthly total expense`,
                valueFormatter,
              },
              {
                dataKey: `totalSaving`,
                label: `Monthly total saving`,
                valueFormatter,
              },
            ]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSettingHorizontal}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Total Monthly Income VS Total Monthly Saving
          </Typography>
          <BarChart
            dataset={vsDataset}
            xAxis={[{ scaleType: "band", dataKey: `month` }]}
            series={[
              {
                dataKey: `totalIncome`,
                label: `Monthly total income`,
                valueFormatter,
              },
              {
                dataKey: `totalSaving`,
                label: `Monthly total saving`,
                valueFormatter,
              },
            ]}
            layout="vertical"
            grid={{ horizontal: true }}
            {...chartSettingVertical}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Overall Total Income, Expense and Saving
          </Typography>
          <Piechart dataset={pieDataset} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ mb: 5, textAlign: "center" }}
          >
            Active Budget
          </Typography>
          <Piechart dataset={budgetDataset} />
        </Grid>
      </Grid>
    </Box>
  );
}
