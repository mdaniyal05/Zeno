import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarChartData() {
  const dataset = [
    {
      seoul: 21,
      month: "Jan",
    },
    {
      seoul: 28,
      month: "Feb",
    },
    {
      seoul: 41,
      month: "Mar",
    },
    {
      seoul: 73,
      month: "Apr",
    },
    {
      seoul: 99,
      month: "May",
    },
    {
      seoul: 144,
      month: "June",
    },
    {
      seoul: 319,
      month: "July",
    },
    {
      seoul: 249,
      month: "Aug",
    },
    {
      seoul: 131,
      month: "Sept",
    },
    {
      seoul: 55,
      month: "Oct",
    },
    {
      seoul: 48,
      month: "Nov",
    },
    {
      seoul: 25,
      month: "Dec",
    },
  ];

  function valueFormatter(value) {
    return `${value} PKR`;
  }

  const chartSetting = {
    xAxis: [{ label: "Currency unit (K)" }],
    height: 400,
    margin: { left: 0 },
  };

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "seoul", label: "Seoul rainfall", valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
