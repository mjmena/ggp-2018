import React, { useMemo, HTMLAttributes } from "react";
import { Vector } from "./types";
import GridLines from "./GridLines";

type Props = {
  viewport: Vector;
  origin: Vector;
  spacing: number;
} & HTMLAttributes<SVGSVGElement>;

const Grid = React.forwardRef<SVGSVGElement, Props>(
  ({ viewport, origin, spacing, ...attrs }, ref) => {
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
        {...attrs}
      >
        <GridLines viewport={viewport} origin={origin} spacing={spacing} />
      </svg>
    );
  }
);

export default React.memo(Grid);
