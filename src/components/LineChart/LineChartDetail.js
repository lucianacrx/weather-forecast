import React from "react";
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { curveLinear } from "@vx/curve";

const height = 500;
const width = 800;

// Accessors
const x = (d) => new Date(d.dt_txt).valueOf();
const y = (d) => d.main.temp;

const LineChartDetail = ({ data = [] }) => {
    const xMax = width - 120;
    const yMax = height - 80;

    const xScale = scaleTime({
        rangeRound: [0, xMax],
        domain: [Math.min(...data.map(x)), Math.max(...data.map(x))],
    })

    const yScale = scaleLinear({
        rangeRound: [0, yMax],
        domain: [Math.max(...data.map(y)), 0],
    })

    return (
      <svg width={width} height={height}>
        <Group top={25} left={65}>
          <AxisLeft scale={yScale} numTicks={5} label="Average Temperature" />
          <AxisBottom scale={xScale} label="Day" labelOffset={15} numTicks={5} top={yMax} />
          {data.map((point, pointIndex) => (
            <circle
              key={pointIndex}
              r={5}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              stroke="#222222"
              fill="#222222"
              fillOpacity={0.5}
            />
          ))}
          <LinePath
            data={data}
            curve={curveLinear}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            stroke="#222222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    )
}

export default LineChartDetail;