import React, { useMemo } from "react";
import { Vector } from "./types";
import GridLines from "./GridLines";

type Props = {
  viewport: Vector;
  origin: Vector;
  spacing: number;
};

const Grid = React.forwardRef<SVGSVGElement, Props>(
  ({ viewport, origin, spacing }, ref) => {
    return (
      <svg
        ref={ref}
        height={viewport.y}
        width={viewport.x}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -10,
          backgroundColor: "black"
        }}
      >
        <GridLines viewport={viewport} origin={origin} spacing={spacing} />
      </svg>
    );
  }
);

export default React.memo(Grid);
