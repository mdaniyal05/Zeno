import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function IncomeExpenseSavingLineChart({ dataset }) {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
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
        <LineChart
          colors={colorPalette}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "month",
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: "income",
              showMark: false,
              curve: "linear",
              area: true,
              dataKey: `totalIncome`,
              label: `Monthly total income`,
            },
            {
              id: "expense",
              showMark: false,
              curve: "linear",
              area: true,
              dataKey: `totalExpense`,
              label: `Monthly total expense`,
            },
            {
              id: "saving",
              showMark: false,
              curve: "linear",
              dataKey: `totalSaving`,
              label: `Monthly total saving`,
              area: true,
            },
          ]}
          height={300}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-income": {
              fill: "url('#income')",
            },
            "& .MuiAreaElement-series-expense": {
              fill: "url('#expense')",
            },
            "& .MuiAreaElement-series-saving": {
              fill: "url('#saving')",
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="income" />
          <AreaGradient color={theme.palette.primary.main} id="expense" />
          <AreaGradient color={theme.palette.primary.light} id="saving" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
