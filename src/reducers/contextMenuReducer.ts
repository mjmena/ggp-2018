import { Vector } from "../types";

interface PositionAction {
  type: "longpressopen" | "down";
  position: Vector;
}

interface SimpleAction {
  type: "open" | "close" | "unlock";
}

type Action = PositionAction | SimpleAction;

type State = {
  open: boolean;
  locked: boolean;
  lastDownPosition: Vector;
  position: Vector;
};

const contextMenuReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "down":
      return { ...state, lastDownPosition: action.position };
    case "open":
      return {
        ...state,
        open: true,
        locked: true,
        position: state.lastDownPosition
      };
    case "unlock":
      return { ...state, locked: false };
    case "close":
      return { ...state, open: false };
    case "longpressopen": {
      if (
        Math.abs(action.position.x - state.lastDownPosition.x) < 15 &&
        Math.abs(action.position.y - state.lastDownPosition.y) < 15
      )
        return {
          ...state,
          open: true,
          locked: true,
          position: state.lastDownPosition
        };
      else return state;
    }
  }
};

export default contextMenuReducer;
