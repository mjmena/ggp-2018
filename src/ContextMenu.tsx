import ReactDOM from "react-dom";
import React, { useEffect, RefObject, useState } from "react";
import { Vector } from "./types";
import usePortalNode from "./hooks/usePortalNode";

type Props = {
  el: RefObject<EventTarget>;
};

const ContextMenu: React.FunctionComponent<Props> = ({ el, children }) => {
  const [position, setPosition] = useState<Vector>({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleContextMenu(evt: Event) {
      if (evt instanceof MouseEvent) {
        evt.preventDefault();
        setPosition({
          x: evt.clientX,
          y: evt.clientY
        });
        setOpen(true);
      }
    }
    function handleClick(evt: Event) {
      setOpen(lastOpen => (lastOpen ? false : lastOpen));
    }

    if (el && el.current) {
      el.current.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      if (el && el.current) {
        el.current.removeEventListener("contextmenu", handleContextMenu);
        document.addEventListener("mousedown", handleClick);
      }
    };
  }, [el]);

  return (
    <div
      style={{
        transform: `translate(${position.x}px,${position.y}px)`,
        backgroundColor: "blue",
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        display: open ? "block" : "none"
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(ContextMenu);
