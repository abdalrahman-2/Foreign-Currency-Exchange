import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

type props = {
  data: {
    date: string;
    base: string;
    quote: string;
    rate: number;
  }[];
  selectedRange: TimeRange;
};

export function RateHistoryChart({ data, selectedRange }: props) {
  function formatXAxis(date: string) {
    const d = new Date(date);

    switch (selectedRange) {
      case '1D':
        return d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });

      case '1W':
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
        });

      case '1M':
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });

      case '3M':
      case '1Y':
        return d.toLocaleDateString('en-US', {
          month: 'short',
        });

      case '5Y':
        return d.getFullYear().toString();

      default:
        return date;
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D3FC47" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#D3FC47" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          minTickGap={90}
          tickFormatter={formatXAxis}
        />
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
