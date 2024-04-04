import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import chroma from 'chroma-js';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const RADIAN = Math.PI / 180;

// Based on Spectral
// https://github.com/gka/chroma.js/blob/cd1b3c0926c7a85cbdc3b1453b3a94006de91a92/src/colors/colorbrewer.js#L42
const COLORS = [
  '#9e0142',
  '#d53e4f',
  '#f46d43',
  '#fdae61',
  '#fee08b',
  '#FC3908',
  '#e6f598',
  '#abdda4',
  '#66c2a5',
  '#3288bd',
  '#5e4fa2',
];

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
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{
          fontWeight: 500,
          fontSize: '0.975rem',
          letterSpacing: 0,
        }}
      >
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
    () => chroma.scale(COLORS).colors(data.length),
    [data.length]
  );

  const onPieEnter = useCallback(
    (_: unknown, index: number) => setActiveIndex(index),
    []
  );

  return (
    <Box sx={{ flex: 1 }} aria-label="categories-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={146}
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
    </Box>
  );
};

export default CategoriesChart;
