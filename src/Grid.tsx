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
  stroke: "black",
  strokeWidth: 3
};

const Grid = ({ viewport, origin, spacing }: Props) => {
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

  return (
    <svg
      height={viewport.y}
      width={viewport.x}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -10 }}
    >
      <g style={{ transform: `translate(${offset.x}px, 0px)` }}>
        {lats}
        <line
          x1={origin.x - offset.x}
          y1={0}
          x2={origin.x - offset.x}
          y2={viewport.y}
          style={boldStyle}
        />
      </g>
      <g style={{ transform: `translate(0px, ${offset.y}px)` }}>
        {longs}
        <line
          y1={origin.y - offset.y}
          x1={0}
          y2={origin.y - offset.y}
          x2={viewport.x}
          style={boldStyle}
        />
      </g>
    </svg>
  );
};

export default React.memo(Grid);
