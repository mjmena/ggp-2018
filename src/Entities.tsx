import React, { Dispatch } from "react";
import { Entity, Vector } from "./types";
import EntityDisplay from "./EntityDisplay";
import { EntityAction } from "./reducers/entityReducer";

type Props = {
  entities: Entity[];
  origin: Vector;
  spacing: number;
  dispatch: Dispatch<EntityAction>;
};

function Entities({ entities, origin, spacing, dispatch }: Props) {
  const entityElements = entities.map((entity, index) => (
    <EntityDisplay
      key={index}
      entity={entity}
      spacing={spacing}
      origin={origin}
      dispatch={dispatch}
    />
  ));
  return <>{entityElements}</>;
}

export default React.memo(Entities);
