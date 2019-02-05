import { useEffect, useRef, MutableRefObject, useReducer } from "react";
import contextMenuReducer from "../reducers/contextMenuReducer";
import { Vector } from "../types";

/**
 * Checks to see if a context menu is open
 * on right click set to open otherwise return false
 */
export default (ref: MutableRefObject<EventTarget | null>) => {
  const timer = useRef<any>(null);
  const [state, dispatch] = useReducer(contextMenuReducer, {
    open: false,
    locked: false,
    position: { x: 0, y: 0 },
    lastDownPosition: { x: 0, y: 0 }
  });

  const handleDown = (evt: Event) => {
    evt.preventDefault();
    clearTimeout(timer.current);

    if (evt instanceof PointerEvent && evt.target === ref.current) {
      dispatch({ type: "down", position: { x: evt.clientX, y: evt.clientY } });
      if (evt.button === 2) {
        dispatch({
          type: "open"
        });
      } else if (evt.pointerType !== "mouse") {
        timer.current = setTimeout(() => {
          dispatch({
            type: "longpressopen",
            position: { x: evt.clientX, y: evt.clientY }
          });
        }, 1000);
      }
    }
  };

  function handleUp(evt: Event) {
    console.log("up", state);
    if (state.open) {
      //check for right click and set open
      clearTimeout(timer.current);
      if (state.locked) {
        dispatch({ type: "unlock" });
      } else dispatch({ type: "close" });
    }
  }

  //attach and remove listeners
  useEffect(() => {
    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
    };
  });

  return [state.open, state.position] as [boolean, Vector];
};
