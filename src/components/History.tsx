import Empty from './Empty';

export default function History() {
  return (
    <div>
      <Empty
        heading="No chart data available"
        description="We couldn't load rate history for USD/EUR right now. This usually clears
        up in a minute."
      />
    </div>
  );
}
