import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetDashboardDataQuery } from "../../../redux/slices/dashboardApiSlice";

const chartSetting = {
  xAxis: [{ label: "Amount" }],
  height: 400,
  margin: { left: 0 },
};

function valueFormatter(value) {
  return `${value} PKR`;
}

export default function Barchart() {
  const [incomeDataset, setIncomedataset] = React.useState([]);
  const [expenseDataset, setExpensedataset] = React.useState([]);

  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      setExpensedataset(data.monthlyExpenseData);
      setIncomedataset(data.monthlyIncomeData);
    }
  }, [data]);

  return (
    <>
      <BarChart
        dataset={incomeDataset}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          {
            dataKey: "totalIncome",
            label: "Total monthly income",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      />
      <BarChart
        dataset={expenseDataset}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          {
            dataKey: "totalExpense",
            label: "Total monthly expense",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        grid={{ vertical: true }}
        {...chartSetting}
      />
    </>
  );
}
