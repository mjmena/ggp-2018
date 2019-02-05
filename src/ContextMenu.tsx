import ReactDOM from "react-dom";
import React, { useEffect, RefObject, useState } from "react";
import { Vector } from "./types";
import useAppendedElement from "./hooks/useAppendedElement";
import useContextMenuStatus from "./hooks/useContextMenuStatus";

type Props = {
  element: RefObject<EventTarget>;
};

const ContextMenu: React.FunctionComponent<Props> = ({ element, children }) => {
  const parent = useAppendedElement();
  const [open, position] = useContextMenuStatus(element);
  useEffect(() => {
    const disable = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", disable);
    return () => document.removeEventListener("contextmenu", disable);
  });

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
