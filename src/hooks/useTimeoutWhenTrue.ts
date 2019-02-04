import { useRef, useEffect } from "react";

function useTimeoutWhenTrue(
  expression: boolean,
  callback: () => void,
  delay: number
) {
  const timer = useRef<any>(null);
  useEffect(() => {
    clearTimeout(timer.current);
    if (expression)
      timer.current = setTimeout(() => {
        callback();
      }, delay);
  }, [expression]);
}

export default useTimeoutWhenTrue;
