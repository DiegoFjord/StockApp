'use client'

import { generateMockMarketData, RechartsDevtools } from '@recharts/devtools';
import {
  Bar,
  BarChart,
  BarShapeProps,
  CartesianGrid,
  DefaultZIndexes,
  ErrorBar,
  Rectangle,
  Tooltip,
  TooltipContentProps,
  TooltipIndex,
  XAxis,
  YAxis,
} from 'recharts';
import { MarketCandle } from '@recharts/devtools/dist/generateMockMarketData';
import { MarketCandlenew } from '@/app/lib/definitions';


const barDataKey: (entry: MarketCandlenew) => [number, number] = entry => [
  Math.min(entry.close, entry.open),
  Math.max(entry.close, entry.open),
];

const whiskerDataKey: (entry: MarketCandlenew) => [number, number] = entry => {
  const highEnd = Math.max(entry.close, entry.open);
  return [highEnd - entry.low, entry.high - highEnd];
};

const formatDollars = (value: number) => `$${value.toFixed(2)}`;

const Candlestick = (props: BarShapeProps) => {
  // @ts-expect-error Recharts does spread MarketCandle on the props but the types don't reflect that
  const color = props.open < props.close ? 'green' : 'red';
  return <Rectangle {...props} fill={color} />;
};

let mc:MarketCandle;
const TooltipContent = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const entry: MarketCandlenew = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '0 1em',
        }}
      >
        <p style={{ margin: 0 }}>{`Date: ${entry.date}`}</p>
        <p style={{ margin: 0 }}>{`Open: ${formatDollars(entry.open)}`}</p>
        <p style={{ margin: 0 }}>{`Close: ${formatDollars(entry.close)}`}</p>
        <p style={{ margin: 0 }}>{`Low: ${formatDollars(entry.low)}`}</p>
        <p style={{ margin: 0 }}>{`High: ${formatDollars(entry.high)}`}</p>
        <p style={{ margin: 0 }}>{`Volume: ${entry.volume}`}</p>
        <p style={{ margin: 0 }}>{`%Change: ${entry.pchange}%`}</p>
      </div>
    );
  }
  return null;
};

const tickFormatter = (value: string): string => {
  const date = new Date(value);
  return `${date.getMonth() + 1}-${date.getFullYear()}`;
};

export default function CandlestickExample({ defaultIndex, data }: { defaultIndex?: TooltipIndex, data: ReadonlyArray<MarketCandlenew>}) {
  return (
        <BarChart
        data={data}
        style={{ width: '100%', maxWidth: '800px', maxHeight: '70vh', aspectRatio: 1.618 }}
        margin={{ top: 20, right: 10, bottom: 10, left: 20 }}
        responsive
      >
        <XAxis dataKey="date" tickFormatter={tickFormatter} />
        <YAxis domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={formatDollars} />
        <CartesianGrid vertical={false} />
        <Bar dataKey={barDataKey} shape={Candlestick}>
          <ErrorBar dataKey={whiskerDataKey} width={0} zIndex={DefaultZIndexes.bar - 1} />
        </Bar>
        <Tooltip content={TooltipContent} defaultIndex={defaultIndex} />
        <RechartsDevtools />
      </BarChart>
  );
}