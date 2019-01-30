import React, { useState, useReducer, useRef, MouseEvent } from "react";
import { Vector, Entity } from "./types";
import Grid from "./Grid";
import Entities from "./Entities";
import useViewport from "./hooks/useViewport";
import useWheel from "./hooks/useWheel";
import ContextMenu from "./ContextMenu";

interface EntityAction {
  type: "add" | "remove";
  entity: Entity;
}

function entityReducer(state: Entity[], action: EntityAction): Entity[] {
  switch (action.type) {
    case "add":
      return [...state, action.entity];
    default:
      return state;
  }
}

function App() {
  const [entities, dispatch] = useReducer(entityReducer, []);
  const [offset, spacing] = useWheel({ x: 0, y: 0 }, 50);
  const viewport = useViewport();
  const forMenu = useRef(null);
  const center = {
    x: Math.round(viewport.x / 2),
    y: Math.round(viewport.y / 2)
  };
  const origin: Vector = {
    x: Math.round(viewport.x / 2) + offset.x,
    y: Math.round(viewport.y / 2) + offset.y
  };

  function handleAddEntity(e: MouseEvent) {
    console.log("add one");
    dispatch({
      type: "add",
      entity: {
        position: {
          x: Math.floor((e.clientX - origin.x) / spacing),
          y: Math.floor((e.clientY - origin.y) / spacing)
        },
        color: "red"
      }
    });
  }

  return (
    <>
      <ContextMenu element={forMenu}>
        <button onClick={handleAddEntity}>Add One</button>
      </ContextMenu>
      <Grid
        ref={forMenu}
        origin={origin}
        viewport={viewport}
        spacing={spacing}
      />
      {`(${origin.x},${origin.y})`}
      <Entities entities={entities} spacing={spacing} origin={origin} />
    </>
  );
}

export default App;
