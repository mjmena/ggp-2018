import ReactDOM from "react-dom";
import React, { useEffect, RefObject, useState } from "react";
import { Vector } from "./types";
import useAppendedElement from "./hooks/useAppendedElement";

type Props = {
  element: RefObject<EventTarget>;
};

const ContextMenu: React.FunctionComponent<Props> = ({ element, children }) => {
  const [position, setPosition] = useState<Vector>({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const parent = useAppendedElement();

  function handleContextMenu(evt: Event) {
    if (evt instanceof MouseEvent) {
      evt.preventDefault();
      setPosition({
        x: evt.clientX,
        y: evt.clientY
      });
    }
  }

  function handleClick(evt: Event) {
    if (
      evt instanceof MouseEvent &&
      (evt.target === element.current ||
        evt.target === parent ||
        parent.contains(evt.target as Node)) &&
      evt.button === 2
    )
      setOpen(true);
    else setOpen(false);
  }

  function handleDisable(e: Event) {
    e.preventDefault();
  }

  useEffect(() => {
    if (element && element.current) {
      element.current.addEventListener("contextmenu", handleContextMenu);
      parent.addEventListener("contextmenu", handleDisable);
      document.addEventListener("mouseup", handleClick);
    }

    return () => {
      if (element && element.current) {
        element.current.removeEventListener("contextmenu", handleContextMenu);
        parent.removeEventListener("contextmenu", handleDisable);
        document.removeEventListener("mouseup", handleClick);
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        transform: `translate(${position.x}px,${position.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
        display: open ? "block" : "none"
      }}
    >
      {children}
    </div>,
    parent
  );
};

export default React.memo(ContextMenu);
