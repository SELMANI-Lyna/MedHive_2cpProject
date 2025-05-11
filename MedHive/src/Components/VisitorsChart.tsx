import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the type for a data point
type ChartDataPoint = {
  name: string;
  value: number;
};

const data: ChartDataPoint[] = [
  { name: "5k", value: 20 },
  { name: "10k", value: 35 },
  { name: "15k", value: 30 },
  { name: "20k", value: 70 },
  { name: "25k", value: 45 },
  { name: "30k", value: 55 },
  { name: "35k", value: 30 },
  { name: "40k", value: 20 },
];

const VisitorsChart = () => {
  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#2F9784]">Visitors Chart</h2>
        <span className="bg-[#2C7865] text-white px-3 py-1 rounded-lg text-xs">
          September
        </span>
      </div>

      {/* make chart responsive */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2C7865"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
