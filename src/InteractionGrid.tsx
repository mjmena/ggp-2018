import React from "react";
import { Vector } from "./types";

type Props = {
  viewport: Vector;
};

const InteractionGrid = React.forwardRef<HTMLDivElement, Props>(
  ({ viewport }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: viewport.x,
          height: viewport.y
        }}
      />
    );
  }
);

export default React.memo(InteractionGrid);
