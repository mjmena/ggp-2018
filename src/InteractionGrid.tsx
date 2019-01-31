import React, { CSSProperties } from "react";
import { Vector } from "./types";

type Props = {
  viewport: Vector;
};

const InteractionGrid = React.forwardRef<HTMLDivElement, Props>(
  ({ viewport }, ref) => {
    const style: CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      width: viewport.x,
      height: viewport.y
    };

    return <div ref={ref} style={style} />;
  }
);

export default React.memo(InteractionGrid);
