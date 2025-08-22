import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

export default function IncomeExpenseSavingBarChart({ dataset }) {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Income VS Expense VS Saving
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Monthly Income, Expense and Saving
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.3,
              dataKey: "month",
              height: 24,
            },
          ]}
          yAxis={[{ width: 55 }]}
          series={[
            {
              dataKey: `totalIncome`,
              label: `Monthly total income`,
            },
            {
              dataKey: `totalExpense`,
              label: `Monthly total expense`,
            },
            {
              dataKey: `totalSaving`,
              label: `Monthly total saving`,
            },
          ]}
          height={300}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
        />
      </CardContent>
    </Card>
  );
}
