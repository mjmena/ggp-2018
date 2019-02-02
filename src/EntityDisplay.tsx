import React, { useRef, Dispatch, useState } from "react";
import { Entity, Vector } from "./types";
import ContextMenu from "./ContextMenu";
import { EntityAction } from "./reducers/entityReducer";

function convertClickToLocal(
  x: number,
  y: number,
  origin: Vector,
  spacing: number
) {
  const localX = Math.floor((x - origin.x) / spacing);
  const localY = Math.floor((y - origin.y) / spacing);
  const local = { x: Math.floor(localX), y: Math.floor(localY) };
  return local;
}

type Props = {
  entity: Entity;
  origin: Vector;
  spacing: number;
  dispatch: Dispatch<EntityAction>;
};

function EntityDisplay({ entity, origin, spacing, dispatch }: Props) {
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
        onPointerDown={e => {
          if (e.target === forMenu.current) {
            e.preventDefault();
            console.log(e.pointerId);
            (e.target as Element).setPointerCapture(e.pointerId);
            dispatch({
              type: "color",
              color: "red",
              id: entity.id
            });
          }
        }}
        onPointerUp={e => {
          if (e.target === forMenu.current) {
            e.preventDefault();

            console.log(e.pointerId);
            (e.target as Element).releasePointerCapture(e.pointerId);
            dispatch({
              type: "color",
              color: "yellow",
              id: entity.id
            });
            dispatch({
              type: "move",
              id: entity.id,
              position: convertClickToLocal(
                e.clientX,
                e.clientY,
                origin,
                spacing
              )
            });
          }
        }}
      >
        ({entity.position.x},{entity.position.y})
      </div>
      <ContextMenu element={forMenu}>
        <span style={{ backgroundColor: "white" }}>clicked</span>
      </ContextMenu>
    </>
  );
}

export default EntityDisplay;
