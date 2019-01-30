import React from "react";
import { Entity, Vector } from "./types";
import EntityDisplay from "./EntityDisplay";

type Props = {
  entities: Entity[];
  origin: Vector;
  spacing: number;
};

function Entities({ entities, origin, spacing }: Props) {
  const entityElements = entities.map((entity, index) => (
    <EntityDisplay
      key={index}
      entity={entity}
      spacing={spacing}
      origin={origin}
    />
  ));
  return <>{entityElements}</>;
}

export default React.memo(Entities);
