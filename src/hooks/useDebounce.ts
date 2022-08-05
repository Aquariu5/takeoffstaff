import { useCallback, useRef } from "react";

export const useDebouce = (callback: Function, delay: number) => {
  const timerRef: { current: NodeJS.Timeout | null } = useRef(null);

  const debounceCallback = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);

  return debounceCallback;
};
