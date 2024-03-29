import React, { useMemo } from "react";
import { Vector } from "./types";
import { range } from "lodash";

type Props = {
  viewport: Vector;
  origin: Vector;
  spacing: number;
};

const style = {
  stroke: "grey"
};

const boldStyle = {
  ...style,
  stroke: "white",
  strokeWidth: 3
};

const GridLines = ({ viewport, origin, spacing }: Props) => {
  const offset = {
    x: origin.x % spacing,
    y: origin.y % spacing
  };

  const [lats, longs] = useMemo(() => {
    const lats = range(-spacing, viewport.x + spacing, spacing).map(x => (
      <line key={x} x1={x} y1={0} x2={x} y2={viewport.y} style={style} />
    ));

    const longs = range(-spacing, viewport.y + spacing, spacing).map(y => (
      <line key={y} x1={0} y1={y} x2={viewport.x} y2={y} style={style} />
    ));

    return [lats, longs];
  }, [viewport, spacing]);

  const xAxis = (
    <line
      x1={origin.x - offset.x}
      y1={0}
      x2={origin.x - offset.x}
      y2={viewport.y}
      style={boldStyle}
    />
  );

  const yAxis = (
    <line
      y1={origin.y - offset.y}
      x1={0}
      y2={origin.y - offset.y}
      x2={viewport.x}
      style={boldStyle}
    />
  );
  return (
    <>
      <g
        style={{
          transform: `translate(${offset.x}px, 0px)`
        }}
      >
        {lats}
        {xAxis}
      </g>
      <g
        style={{
          transform: `translate(0px, ${offset.y}px)`
        }}
      >
        {longs}
        {yAxis}
      </g>
    </>
  );
};

export default React.memo(GridLines);
