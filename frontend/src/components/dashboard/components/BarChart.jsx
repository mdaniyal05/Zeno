import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetAllUserIncomesQuery } from "../../../redux/slices/incomeApiSlice";
import { useGetAllUserExpensesQuery } from "../../../redux/slices/expenseApiSlice";
import { dataset } from "../../../lib/dataset";
import incomeMap from "../../../lib/incomeMapData";
import expenseMap from "../../../lib/expenseMapData";

export default function IncomeAndExpenseBarChart() {
  const { data: income } = useGetAllUserIncomesQuery();
  const { data: expense } = useGetAllUserExpensesQuery();

  React.useEffect(() => {
    if (income && expense) {
      incomeMap(dataset, income);
      expenseMap(dataset, expense);
    }
  }, [income, expense]);

  function valueFormatter(value) {
    return `${value} PKR`;
  }

  const chartSetting = {
    xAxis: [{ label: "Amount" }],
    height: 400,
    margin: { left: 0 },
  };

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "income", label: "Total monthly income", valueFormatter },
        { dataKey: "expense", label: "Total monthly expense", valueFormatter },
      ]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
