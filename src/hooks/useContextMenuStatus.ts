import { useEffect, useRef, MutableRefObject, useReducer } from "react";
import contextMenuReducer from "../reducers/contextMenuReducer";
import { Vector } from "../types";
import useTimeoutWhenTrue from "./useTimeoutWhenTrue";

/**
 * Checks to see if a context menu is open
 * on right click set to open otherwise return false
 */
export default (ref: MutableRefObject<EventTarget | null>) => {
  const [state, dispatch] = useReducer(contextMenuReducer, {
    open: false,
    isRightClick: false,
    isLongPress: false,
    position: { x: 0, y: 0 },
    lastDownPosition: { x: 0, y: 0 }
  });

  const handleDown = (evt: Event) => {
    evt.preventDefault();
    if (evt instanceof PointerEvent) {
      dispatch({ type: "down", position: { x: evt.clientX, y: evt.clientY } });
      if (evt.button === 2 && evt.target === ref.current) {
        dispatch({
          type: "startrightclick",
          position: { x: evt.clientX, y: evt.clientY }
        });
      }
      if (evt.pointerType !== "mouse") {
        dispatch({ type: "startlongpress" });
      }
    }
  };

  function handleUp(evt: Event) {
    dispatch({ type: "up" });
  }

  //start a timer whenever there is a possible long press and reset on change
  useTimeoutWhenTrue(state.isLongPress, () => dispatch({ type: "open" }), 1000);

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
