import {
  LineChart, Line,
  XAxis, YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DevChart({ data }) {
  const chartData = Object.entries(data || {}).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 8, right: 16, bottom: 0, left: -12 }}
      >
        <XAxis
          dataKey="date"
          stroke="#1e293b"
          tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono, monospace" }}
        />
        <YAxis
          stroke="#1e293b"
          tick={{ fill: "#475569", fontSize: 11, fontFamily: "DM Mono, monospace" }}
        />
        <Tooltip
          contentStyle={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 8,
            color: "#e2e8f0",
            fontFamily: "DM Mono, monospace",
            fontSize: 12,
          }}
          cursor={{ stroke: "#1e293b" }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#38bdf8"
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}