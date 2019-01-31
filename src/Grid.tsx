import React from "react";
import { Vector } from "./types";
import { range } from "lodash";

type Props = {
  viewport: Vector;
  origin: Vector;
  spacing: number;
};

const Grid = ({ viewport, origin, spacing }: Props) => {
  const local_offset = {
    x: origin.x % spacing,
    y: origin.y % spacing
  };

  const left = local_offset.x - spacing;
  const right = viewport.x + local_offset.x + spacing;
  const lats = range(left, right, spacing).map(x => {
    if (x === origin.x)
      return (
        <line key={x} x1={x} y1={0} x2={x} y2={viewport.y} stroke="black" />
      );
    return <line key={x} x1={x} y1={0} x2={x} y2={viewport.y} stroke="grey" />;
  });

  const top = local_offset.y - spacing;
  const bottom = viewport.y + local_offset.y + spacing;
  const longs = range(top, bottom, spacing).map(y => {
    if (y === origin.y)
      return (
        <line key={y} x1={0} y1={y} x2={viewport.x} y2={y} stroke="black" />
      );
    return <line key={y} x1={0} y1={y} x2={viewport.x} y2={y} stroke="grey" />;
  });

  return (
    <svg
      height={viewport.y}
      width={viewport.x}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -10 }}
    >
      {lats}
      {longs}
    </svg>
  );
};

export default React.memo(Grid);
