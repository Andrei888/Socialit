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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
