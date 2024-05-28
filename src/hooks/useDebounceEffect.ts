import { useEffect } from "react";
export const useDebounceEffect = (
  fn: () => void,
  waitingTime: number,
  deps?: []
) => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps || []);
    }, waitingTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
};
