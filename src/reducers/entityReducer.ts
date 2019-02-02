import { Entity, Vector } from "../types";

interface AddAction {
  type: "add";
  entity: Entity;
}

interface MoveAction {
  type: "move";
  id: string;
  position: Vector;
}

interface ColorAction {
  type: "color";
  id: string;
  color: string;
}

export type EntityAction = AddAction | MoveAction | ColorAction;

export function entityReducer(state: Entity[], action: EntityAction): Entity[] {
  console.log(action);
  switch (action.type) {
    case "add":
      return [...state, action.entity];
    case "move":
      const toMove = state.find(entity => entity.id === action.id);
      if (toMove) {
        return [
          ...state.filter(e => e !== toMove),
          { ...toMove, position: action.position }
        ];
      } else return state;
    case "color":
      const toColor = state.find(entity => entity.id === action.id);
      if (toColor) {
        return [
          ...state.filter(e => e !== toColor),
          { ...toColor, color: action.color }
        ];
      } else return state;
  }
}
