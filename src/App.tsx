import React, { useReducer, useRef, MouseEvent, useCallback } from "react";
import { Vector, Entity } from "./types";
import InteractionGrid from "./InteractionGrid";
import Grid from "./Grid";
import Entities from "./Entities";
import useViewport from "./hooks/useViewport";
import useWheel from "./hooks/useWheel";
import ContextMenu from "./ContextMenu";
import { entityReducer } from "./reducers/entityReducer";

function App() {
  const forContextMenu = useRef(null);
  const [entities, dispatch] = useReducer(entityReducer, []);

  const viewport = useViewport();
  const [offset, spacing] = useWheel({ x: 0, y: 0 }, 50);
  const origin: Vector = {
    x: Math.round(viewport.x / 2) + offset.x,
    y: Math.round(viewport.y / 2) + offset.y
  };

  const handleAddEntity = useCallback(
    (e: MouseEvent) => {
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
    },
    [origin, spacing]
  );

  return (
    <>
      <ContextMenu element={forContextMenu}>
        <button onClick={handleAddEntity}>Add One</button>
      </ContextMenu>
      <Grid origin={origin} viewport={viewport} spacing={spacing} />
      <InteractionGrid ref={forContextMenu} viewport={viewport} />
      <span style={{ backgroundColor: "white" }}>{`(${origin.x},${
        origin.y
      })`}</span>
      <Entities entities={entities} spacing={spacing} origin={origin} />
    </>
  );
}

export default React.memo(App);
