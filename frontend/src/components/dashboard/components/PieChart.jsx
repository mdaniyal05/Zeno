import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useGetDashboardDataQuery } from "../../../redux/slices/dashboardApiSlice";

export default function Piechart() {
  const [dataset, setDataset] = React.useState([]);
  const { data } = useGetDashboardDataQuery();

  React.useEffect(() => {
    if (data) {
      const combined = [
        ...data.totalIncomeData.map((obj, idx) => ({
          id: idx + 1,
          value: obj.allIncome,
          label: "Total income",
        })),
        ...data.totalExpenseData.map((obj, idx) => ({
          id: data.totalIncomeData.length + idx + 1,
          value: obj.allExpense,
          label: "Total expense",
        })),
        ...data.totalSavingData.map((obj, idx) => ({
          id:
            data.totalIncomeData.length +
            data.totalExpenseData.length +
            idx +
            1,
          value: obj.allSaving,
          label: "Total saving",
        })),
      ];

      setDataset(combined);
    }
  }, [data]);

  return (
    <PieChart
      series={[
        {
          data: dataset,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -225,
          endAngle: 225,
        },
      ]}
      width={200}
      height={200}
    />
  );
}
