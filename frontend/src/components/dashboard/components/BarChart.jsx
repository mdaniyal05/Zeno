import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetAllUserIncomesQuery } from "../../../redux/slices/incomeApiSlice";
import { useGetAllUserExpensesQuery } from "../../../redux/slices/expenseApiSlice";

const dataset = [
  {
    income: 0,
    expense: 0,
    month: "Jan",
  },
  {
    income: 0,
    expense: 0,
    month: "Feb",
  },
  {
    income: 0,
    expense: 0,
    month: "Mar",
  },
  {
    income: 0,
    expense: 0,
    month: "Apr",
  },
  {
    income: 0,
    expense: 0,
    month: "May",
  },
  {
    income: 0,
    expense: 0,
    month: "June",
  },
  {
    income: 0,
    expense: 0,
    month: "July",
  },
  {
    income: 0,
    expense: 0,
    month: "Aug",
  },
  {
    income: 0,
    expense: 0,
    month: "Sept",
  },
  {
    income: 0,
    expense: 0,
    month: "Oct",
  },
  {
    income: 0,
    expense: 0,
    month: "Nov",
  },
  {
    income: 0,
    expense: 0,
    month: "Dec",
  },
];

export default function IncomeAndExpenseBarChart() {
  const { data: income } = useGetAllUserIncomesQuery();
  const { data: expense } = useGetAllUserExpensesQuery();

  if (income && expense) {
    income.incomesData.map((income) => {
      let incomeSum = 0;
      let monthNo = new Date(income.incomeDate).getMonth() + 1;

      switch (monthNo) {
        case 1: {
          let month = dataset.find((u) => u.month === "Jan");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 2: {
          let month = dataset.find((u) => u.month === "Feb");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 3: {
          let month = dataset.find((u) => u.month === "Mar");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 4: {
          let month = dataset.find((u) => u.month === "Apr");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 5: {
          let month = dataset.find((u) => u.month === "May");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 6: {
          let month = dataset.find((u) => u.month === "June");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 7: {
          let month = dataset.find((u) => u.month === "July");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 8: {
          let month = dataset.find((u) => u.month === "Aug");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 9: {
          let month = dataset.find((u) => u.month === "Sep");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 10: {
          let month = dataset.find((u) => u.month === "Oct");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 11: {
          let month = dataset.find((u) => u.month === "Nov");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        case 12: {
          let month = dataset.find((u) => u.month === "Dec");
          incomeSum = incomeSum + income.incomeAmount;
          month.income = month.income + incomeSum;
          break;
        }
        default:
          break;
      }
    });
  }

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
