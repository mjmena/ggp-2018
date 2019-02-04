import { useState, useEffect } from "react";
import useContextMenuStatus from "./useContextMenuStatus";

/**
 * A hook that accumulates the zoom of a "wheel"
 * Handles touchpads decently well
 */
export default function useWheel(
  initialDelta: number,
  maxDelta: number = 200,
  minDelta: number = 20
) {
  const [delta, setDelta] = useState(initialDelta);
  const open = useContextMenuStatus();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      //disable scrolling and zooming if there is a contextmenu open
      if (!open) {
        setDelta(lastDelta => {
          const newDelta = lastDelta - e.deltaY;
          if (newDelta < minDelta) return minDelta;
          if (newDelta > maxDelta) return maxDelta;
          return newDelta;
        });
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => document.removeEventListener("wheel", handleWheel);
  }, [open]);

  return delta;
}
