import React, { useState, useReducer } from "react";
import useOffset from "./hooks/useOffset";
import { Vector, Entity } from "./types";
import DebugToolbar from "./DebugToolbar";
import useViewport from "./hooks/useViewport";
import Grid from "./Grid";
import Entities from "./Entities";

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
  const [offset, setOffset] = useOffset({ x: 0, y: 0 });
  const viewport = useViewport();

  const origin: Vector = {
    x: Math.round(viewport.x / 2) + offset.x,
    y: Math.round(viewport.y / 2) + offset.y
  };

  function addEntity() {
    dispatch(getEntityAction());
  }

  const [spacing, setSpacing] = useState(50);

  return (
    <>
      <Grid origin={origin} viewport={viewport} spacing={spacing} />
      <DebugToolbar
        spacing={spacing}
        setSpacing={setSpacing}
        offset={offset}
        setOffset={setOffset}
      />
      {`(${origin.x},${origin.y})`}
      <button onClick={addEntity}>Add One</button>
      <Entities entities={entities} spacing={spacing} origin={origin} />
    </>
  );
}

export default App;
