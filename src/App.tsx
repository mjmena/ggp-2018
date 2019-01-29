import React, { useState, useReducer } from "react";
import { Vector, Entity } from "./types";
import Grid from "./Grid";
import Entities from "./Entities";
import useViewport from "./hooks/useViewport";
import useWheel from "./hooks/useWheel";

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

const getEntityAction = () =>
  ({
    type: "add",
    entity: {
      position: {
        x: Math.floor(Math.random() * 10) - 5,
        y: Math.floor(Math.random() * 10) - 5
      },
      color: "red"
    }
  } as EntityAction);

function App() {
  const [entities, dispatch] = useReducer(entityReducer, []);
  const [offset, spacing] = useWheel({ x: 0, y: 0 }, 50);
  const viewport = useViewport();

  const origin: Vector = {
    x: Math.round(viewport.x / 2) + offset.x,
    y: Math.round(viewport.y / 2) + offset.y
  };

  function addEntity() {
    dispatch(getEntityAction());
  }

  return (
    <>
      <Grid origin={origin} viewport={viewport} spacing={spacing} />
      {`(${origin.x},${origin.y})`}
      <button onClick={addEntity}>Add One</button>
      <Entities entities={entities} spacing={spacing} origin={origin} />
    </>
  );
}

export default App;
