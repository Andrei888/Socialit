import { useEffect } from "react";

const useShouldFetch = (
  shouldFetch: boolean,
  fetch: (...props: any) => void,
  ...fetchArg: any
) => {
  console.log(shouldFetch);
  useEffect(() => {
    shouldFetch && fetch && fetch(...fetchArg);
  }, [fetch, fetchArg, shouldFetch]);
};

export default useShouldFetch;
