import { useState, useEffect } from "react";
import { Vector } from "../types";

export default function useViewport() {
  function getViewport(): Vector {
    return {
      x: window.innerWidth,
      y: window.innerHeight
    };
  }

  const [viewport, setViewport] = useState(getViewport);
  useEffect(() => {
    function handleResize() {
      setViewport(getViewport());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}
