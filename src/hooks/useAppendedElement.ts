import { useEffect, useRef } from "react";

export default function useAppendedElement() {
  const element = useRef(document.createElement("div")).current;
  useEffect(() => {
    document.body.appendChild(element);
    return () => document.body.removeChild(element);
  }, []);

  return element;
}
