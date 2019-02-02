import React, { useRef, Dispatch } from "react";
import { Entity, Vector } from "./types";
import ContextMenu from "./ContextMenu";
import { EntityAction } from "./reducers/entityReducer";

function convertLocalToWorldPosition(position: Vector, spacing: number) {}

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
          if (e.target instanceof Element) {
            e.target.setPointerCapture(e.pointerId);
          }
          dispatch({
            type: "color",
            color: "red",
            id: entity.id
          });
        }}
        onPointerUp={e => {
          dispatch({
            type: "color",
            color: "yellow",
            id: entity.id
          });
          dispatch({
            type: "move",
            id: entity.id,
            position: {
              x: Math.floor((origin.x - e.clientX) / spacing),
              y: Math.floor((origin.y - e.clientY) / spacing)
            }
          });
        }}
      />
      <ContextMenu element={forMenu}>
        Entity at ({entity.position.x},{entity.position.y}) clicked
      </ContextMenu>
    </>
  );
}

export default EntityDisplay;
