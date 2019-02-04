import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Vector } from "../types";

/**
 * Checks to see if a context menu is open
 * on right click set to open otherwise return false
 */
export default (ref: MutableRefObject<EventTarget | null>) => {
  const timer = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleUp(evt: Event) {
    //check for right click and set open
    clearTimeout(timer.current);
    if (buffer) {
      setBuffer(false);
    } else setOpen(false);
  }

  const handleDown = (evt: Event) => {
    if (evt instanceof PointerEvent) {
      if (evt.button === 2) {
        setOpen(true);
        setBuffer(true);
        setPosition({ x: evt.clientX, y: evt.clientY });
      } else {
        timer.current = setTimeout(() => {
          setOpen(true);
          setBuffer(true);
          setPosition({ x: evt.clientX, y: evt.clientY });
        }, 1000);
      }
    }
  };

  //attach and remove listeners
  useEffect(() => {
    if (ref.current instanceof EventTarget) {
      ref.current.addEventListener("pointerdown", handleDown);
      ref.current.addEventListener("pointerup", handleUp);
      return () => {
        if (ref.current instanceof EventTarget) {
          ref.current.removeEventListener("pointerdown", handleDown);
          ref.current.removeEventListener("pointerup", handleUp);
        }
      };
    }
  }, [buffer]);
  return [open, position] as [boolean, Vector];
};
