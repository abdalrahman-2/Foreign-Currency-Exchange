import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

export function RateHistoryChart() {
  const data = [
    { name: 'A', rate: 1 },
    { name: 'B', rate: 0.7 },
    { name: 'C', rate: 0.1 },
    { name: 'D', rate: 0.85 },
    { name: 'E', rate: 0.4 },
    { name: 'F', rate: 0.7 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D3FC47" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#D3FC47" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#D3FC47"
          strokeWidth={2}
          fill="url(#rateGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
