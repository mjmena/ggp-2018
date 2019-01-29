import React from "react";
import { Entity, Vector } from "./types";

type Props = {
  entities: Entity[];
  origin: Vector;
  spacing: number;
};

function Entities({ entities, origin, spacing }: Props) {
  const entityElements = entities.map((entity, index) => {
    const top = spacing * entity.position.y + origin.y;
    const left = spacing * entity.position.x + origin.x;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: spacing,
          height: spacing,
          backgroundColor: entity.color
        }}
      >
        ({top},{left})
      </div>
    );
  });
  return <>{entityElements}</>;
}

export default React.memo(Entities);
