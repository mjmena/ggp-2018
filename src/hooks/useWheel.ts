import { useState, useEffect } from "react";
import { Vector } from "../types";

export default function useWheel(initialScroll: Vector, initialZoom: number) {
  const [scroll, setScroll] = useState(initialScroll);
  const [zoom, setZoom] = useState(initialZoom);
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.ctrlKey) {
        setZoom(lastZoom => {
          return lastZoom + e.deltaY;
        });
      } else {
        setScroll(lastScroll => {
          return { x: lastScroll.x + e.deltaX, y: lastScroll.y + e.deltaY };
        });
      }
    }

    document.addEventListener("wheel", handleWheel);
    return () => document.removeEventListener("wheel", handleWheel);
  }, []);

  return [scroll, zoom] as [Vector, number];
}
