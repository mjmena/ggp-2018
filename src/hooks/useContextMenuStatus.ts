import { useState, useEffect } from "react";

/**
 * Checks to see if a context menu is open
 * on right click set to open otherwise return false
 */
export default function useContextMenuStatus() {
  const [status, setStatus] = useState(false);

  function handleMouseUp(evt: Event) {
    //check for right click and set open
    if (evt instanceof PointerEvent && evt.button === 2) {
      setStatus(true);
    } else setStatus(false);
  }

  //attach and remove listeners
  useEffect(() => {
    document.body.addEventListener("pointerup", handleMouseUp);
    return () => document.body.removeEventListener("pointerup", handleMouseUp);
  }, []);
  return status;
}
