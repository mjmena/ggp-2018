import { Vector } from "../types";

interface PositionAction {
  type: "down" | "startrightclick";
  position: Vector;
}

interface SimpleAction {
  type: "open" | "startlongpress" | "stoplongpress" | "up";
}

type Action = PositionAction | SimpleAction;

type State = {
  open: boolean;
  isRightClick: boolean;
  isLongPress: boolean;
  lastDownPosition: Vector;
  position: Vector;
};

const contextMenuReducer = (state: State, action: Action) => {
  console.log(action, state);
  switch (action.type) {
    case "down": {
      console.log(action.position);
      return {
        ...state,
        lastDownPosition: action.position,
        isLongPress: false
      };
    }
    case "up": {
      if (state.isRightClick) {
        return {
          ...state,
          isRightClick: false
        };
      } else if (state.isLongPress) {
        return { ...state };
      } else {
        return {
          ...state,
          open: false
        };
      }
    }
    case "open":
      return {
        ...state,
        open: true,
        locked: true,
        position: state.lastDownPosition
      };
    case "startlongpress":
      return { ...state, isLongPress: true };
    case "stoplongpress":
      return { ...state, isLongPress: false };
    case "startrightclick":
      return {
        ...state,
        isRightClick: true,
        open: true,
        position: action.position
      };
  }
};

export default contextMenuReducer;
