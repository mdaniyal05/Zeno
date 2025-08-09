import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [{ label: "Amount" }],
  height: 400,
  margin: { left: 0 },
};

function valueFormatter(value) {
  return `${value} Amount`;
}

export default function Barchart({
  dataset,
  yAxisDataKey,
  seriesDataKey,
  label,
}) {
  return (
    <>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: `${yAxisDataKey}` }]}
        series={[
          {
            dataKey: `${seriesDataKey}`,
            label: `${label}`,
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
