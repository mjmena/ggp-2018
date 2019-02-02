import React, { useRef, Dispatch, useState, PointerEvent } from "react";
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
  const [captured, setCaptured] = useState(false);
  const element = useRef<HTMLDivElement | null>(null);
  const top = spacing * entity.position.y + origin.y;
  const left = spacing * entity.position.x + origin.x;

  const handleDown = (e: PointerEvent) => {
    e.preventDefault();
    if (element.current instanceof Element) {
      element.current.setPointerCapture(e.pointerId);
      setCaptured(true);
    }
  };

  const handleUp = (e: PointerEvent) => {
    setCaptured(false);
    dispatch({
      type: "move",
      id: entity.id,
      position: convertClickToLocal(e.clientX, e.clientY, origin, spacing)
    });
  };

  return (
    <>
      <div
        ref={element}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translate(${left + 1}px, ${top + 1}px)`,
          width: spacing - 2,
          height: spacing - 2,
          backgroundColor: captured ? "pink" : entity.color
        }}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
      >
        ({entity.position.x},{entity.position.y})
      </div>
      <ContextMenu element={element}>
        <span style={{ backgroundColor: "white" }}>clicked</span>
      </ContextMenu>
    </>
  );
}

export default EntityDisplay;
