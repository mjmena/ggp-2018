import React from "react";
import { Vector } from "./types";
import { range } from "lodash";

type Props = {
  viewport: Vector;
  offset: Vector;
  spacing: number;
};

function Grid({ viewport, offset, spacing }: Props) {
  const lats = range(0, viewport.x, spacing).map(x => (
    <line x1={x} y1={0} x2={x} y2={viewport.y} stroke="black" />
  ));
  const longs = range(0, viewport.y, spacing).map(y => (
    <line x1={0} y1={y} x2={viewport.x} y2={y} stroke="black" />
  ));
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
}

export default React.memo(Grid);
