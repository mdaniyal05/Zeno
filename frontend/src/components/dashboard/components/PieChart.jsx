import { PieChart } from "@mui/x-charts/PieChart";

export default function Piechart({ dataset }) {
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
