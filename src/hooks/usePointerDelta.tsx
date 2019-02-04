import { useEffect, useReducer, MutableRefObject } from "react";
import { Vector } from "../types";
import useContextMenuStatus from "./useContextMenuStatus";

type State = {
  delta: Vector;
  last: Vector;
  dragging: boolean;
};

interface UpdateAction {
  type: "start" | "update";
  last: Vector;
}

interface StopAction {
  type: "stop";
}

type Action = UpdateAction | StopAction;

const dragReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "start":
      return { ...state, last: action.last, dragging: true };
    case "update":
      return {
        ...state,
        last: action.last,
        delta: {
          x: Math.round(state.delta.x + action.last.x - state.last.x),
          y: Math.round(state.delta.y + action.last.y - state.last.y)
        }
      };
    case "stop":
      return { ...state, dragging: false };
  }
};

const useDragDelta = (ref: MutableRefObject<EventTarget | null>) => {
  const open = useContextMenuStatus(ref);
  const [state, dispatch] = useReducer(dragReducer, {
    delta: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    dragging: false
  });

  useEffect(() => {
    const handlePointerDown = (e: Event) => {
      e.preventDefault();

      if (e instanceof PointerEvent && e.target instanceof Element && !open) {
        dispatch({ type: "start", last: { x: e.clientX, y: e.clientY } });
        e.target.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerUp = (e: Event) => {
      dispatch({ type: "stop" });
    };

    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener("pointerdown", handlePointerDown);
      ref.current.addEventListener("pointerup", handlePointerUp);
      return () => {
        if (ref.current instanceof EventTarget) {
          ref.current.removeEventListener("pointerdown", handlePointerDown);
          ref.current.removeEventListener("pointerup", handlePointerUp);
        }
      };
    }
  }, [ref.current, open]);
  useEffect(() => {
    const handlePointerMove = (e: Event) => {
      if (state.dragging && e instanceof PointerEvent) {
        if (e.pointerType !== "mouse") {
          if (
            Math.abs(state.last.x - e.clientX) > 10 ||
            Math.abs(state.last.y - e.clientY) > 10
          ) {
            dispatch({ type: "update", last: { x: e.clientX, y: e.clientY } });
          }
        } else
          dispatch({ type: "update", last: { x: e.clientX, y: e.clientY } });
      }
    };

    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener("pointermove", handlePointerMove);
      return () => {
        if (ref.current instanceof EventTarget) {
          ref.current.removeEventListener("pointermove", handlePointerMove);
        }
      };
    }
  }, [ref.current, state.dragging]);
  return state.delta;
};

export default useDragDelta;
