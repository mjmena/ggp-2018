import React, { useRef } from "react";
import { Entity, Vector } from "./types";
import ContextMenu from "./ContextMenu";

type Props = {
  entity: Entity;
  origin: Vector;
  spacing: number;
};

function EntityDisplay({ entity, origin, spacing }: Props) {
  const forMenu = useRef(null);
  const top = spacing * entity.position.y + origin.y;
  const left = spacing * entity.position.x + origin.x;
  return (
    <>
      <ContextMenu el={forMenu} />
      <div
        ref={forMenu}
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: spacing,
          height: spacing,
          backgroundColor: entity.color
        }}
      />
    </>
  );
}

export default EntityDisplay;
