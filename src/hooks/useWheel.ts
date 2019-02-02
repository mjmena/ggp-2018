import { useState, useEffect } from "react";
import { Vector } from "../types";
import useContextMenuStatus from "./useContextMenuStatus";

/**
 * A hook that accumulates the zoom and scroll of a "wheel"
 * Handles touchpads decently well
 */
export default function useWheel(
  initialScroll: Vector,
  initialZoom: number,
  maxZoom: number = 200,
  minZoom: number = 20
) {
  const [scroll, setScroll] = useState(initialScroll);
  const [zoom, setZoom] = useState(initialZoom);
  const open = useContextMenuStatus();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      //disable scrolling and zooming if there is a contextmenu open
      if (!open) {
        // handles pinch to zoom on touchpads (quirk)
        if (e.ctrlKey) {
          setZoom(lastZoom => {
            const newZoom = lastZoom - e.deltaY;
            if (newZoom < minZoom) return minZoom;
            if (newZoom > maxZoom) return maxZoom;
            return newZoom;
          });
        } else {
          // updates scrolling in 2d
          setScroll(lastScroll => {
            return {
              x: lastScroll.x - e.deltaX,
              y: lastScroll.y - e.deltaY
            };
          });
        }
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => document.removeEventListener("wheel", handleWheel);
  }, [open]);
  return [scroll, Math.round(zoom)] as [Vector, number];
}
