import {
  useEffect,
  useRef,
  MutableRefObject,
  useReducer,
  useState
} from "react";
import { Vector } from "../types";

interface OpenAction {
  type: "longpressopen" | "down";
  position: Vector;
}

interface OtherAction {
  type: "open" | "close" | "unlock";
}

type Action = OpenAction | OtherAction;

type State = {
  open: boolean;
  locked: boolean;
  lastDownPosition: Vector;
  position: Vector;
};

const menuReducer = (state: State, action: Action) => {
  console.log(action);
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
      console.log(action.position);
      console.log(state.lastDownPosition);
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

/**
 * Checks to see if a context menu is open
 * on right click set to open otherwise return false
 */
export default (ref: MutableRefObject<EventTarget | null>) => {
  const timer = useRef<any>(null);
  const [state, dispatch] = useReducer(menuReducer, {
    open: false,
    locked: false,
    position: { x: 0, y: 0 },
    lastDownPosition: { x: 0, y: 0 }
  });

  function handleUp(evt: Event) {
    if (state.open) {
      //check for right click and set open
      clearTimeout(timer.current);
      if (state.locked) {
        dispatch({ type: "unlock" });
      } else dispatch({ type: "close" });
    }
  }

  const handleDown = (evt: Event) => {
    evt.preventDefault();
    if (evt instanceof PointerEvent) {
      dispatch({ type: "down", position: { x: evt.clientX, y: evt.clientY } });
      if (evt.button === 2) {
        dispatch({
          type: "open"
        });
      } else if (evt.pointerType !== "mouse") {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          dispatch({
            type: "longpressopen",
            position: { x: evt.clientX, y: evt.clientY }
          });
        }, 1000);
      }
    }
  };

  const disableContextMenu = (evt: Event) => {
    evt.preventDefault();
  };

  //attach and remove listeners
  useEffect(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener("contextmenu", disableContextMenu);
      ref.current.addEventListener("pointerdown", handleDown);
      ref.current.addEventListener("pointerup", handleUp);
      return () => {
        if (ref.current instanceof EventTarget) {
          ref.current.removeEventListener("contextmenu", disableContextMenu);
          ref.current.removeEventListener("pointerdown", handleDown);
          ref.current.removeEventListener("pointerup", handleUp);
        }
      };
    }
  });

  return [state.open, state.position] as [boolean, Vector];
};
