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
      <div
        ref={forMenu}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translate(${left + 1}px, ${top + 1}px)`,
          width: spacing - 2,
          height: spacing - 2,
          backgroundColor: entity.color
        }}
      />
      <ContextMenu element={forMenu}>
        Entity at ({entity.position.x},{entity.position.y}) clicked
      </ContextMenu>
    </>
  );
}

export default EntityDisplay;
