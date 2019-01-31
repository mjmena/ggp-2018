import { useState, useEffect } from "react";
import { Vector } from "../types";

export default function useWheel(
  initialScroll: Vector,
  initialZoom: number,
  maxZoom: number = 200,
  minZoom: number = 20
) {
  const [scroll, setScroll] = useState(initialScroll);
  const [zoom, setZoom] = useState(initialZoom);
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.ctrlKey) {
        setZoom(lastZoom => {
          const newZoom = lastZoom - e.deltaY;
          if (newZoom < minZoom) return minZoom;
          if (newZoom > maxZoom) return maxZoom;
          return lastZoom - e.deltaY;
        });
      } else {
        setScroll(lastScroll => {
          return {
            x: lastScroll.x + e.deltaX,
            y: lastScroll.y + e.deltaY
          };
        });
      }
    }

    document.addEventListener("wheel", handleWheel);
    return () => document.removeEventListener("wheel", handleWheel);
  }, []);

  return [scroll, Math.round(zoom)] as [Vector, number];
}
