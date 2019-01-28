import React, { useState, useReducer } from "react";
import useOffset from "./hooks/useOffset";
import { Vector, Entity } from "./types";
import DebugToolbar from "./DebugToolbar";
import useViewport from "./hooks/useViewport";
import Grid from "./Grid";

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
        x: Math.floor(Math.random() * 20) - 10,
        y: Math.floor(Math.random() * 20) - 10
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

  const [spacing, setSpacing] = useState(20);

  const entityElements = entities.map(entity => (
    <div
      style={{
        position: "absolute",
        top: spacing * entity.position.y + origin.y,
        left: spacing * entity.position.x + origin.x,
        width: spacing,
        height: spacing,
        backgroundColor: entity.color
      }}
    />
  ));

  return (
    <>
      <Grid viewport={viewport} offset={offset} spacing={spacing} />
      <DebugToolbar
        spacing={spacing}
        setSpacing={setSpacing}
        offset={offset}
        setOffset={setOffset}
      />
      {`(${origin.x},${origin.y})`}
      <button onClick={addEntity}>Add One</button>
      {entityElements}
    </>
  );
}

export default App;
