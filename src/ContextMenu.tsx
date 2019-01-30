import React, { useEffect, RefObject, useState } from "react";
import { Vector } from "./types";

type Props = {
  el: RefObject<EventTarget>;
};

const ContextMenu = ({ el }: Props) => {
  const [position, setPosition] = useState<Vector | null>(null);
  useEffect(() => {
    function handleContextMenu(evt: Event) {
      if (evt instanceof MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        setPosition({ x: evt.clientX, y: evt.clientY });
      }
    }
    function handleClick(evt: Event) {
      if (evt instanceof MouseEvent) {
        setPosition(null);
      }
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
    position && (
      <div
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: 50,
          height: 50,
          backgroundColor: "blue"
        }}
      />
    )
  );
};

export default ContextMenu;
