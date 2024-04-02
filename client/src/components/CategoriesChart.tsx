import { useCallback, useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import chroma from 'chroma-js';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const RADIAN = Math.PI / 180;

const renderActiveShape = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius,
  outerRadius = 0,
  startAngle,
  endAngle,
  fill,
  value,
  name = '',
}: PieSectorDataItem) => {
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#000"
        style={{
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        {value ? `${(value * 100).toFixed(2)}%` : 0}
      </text>
    </g>
  );
};

const CategoriesChart: React.FC<{
  data: { name: string; value: number }[];
}> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const palette = useMemo(
    () => chroma.scale('Spectral').colors(data.length),
    [data.length]
  );

  const onPieEnter = useCallback(
    (_: unknown, index: number) => setActiveIndex(index),
    []
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={140}
          outerRadius={180}
          dataKey="value"
          paddingAngle={0.1}
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={palette[index % palette.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoriesChart;
