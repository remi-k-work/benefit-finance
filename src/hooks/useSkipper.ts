// react
import { useCallback, useEffect, useRef } from "react";

// To skip the pagination reset temporarily in the tanstack table
export default function useSkipper() {
  const shouldSkipRef = useRef(true);

  // Reset to true after the render cycle where it was used
  useEffect(() => {
    shouldSkipRef.current = true;
  });

  const shouldSkip = useCallback(() => {
    return shouldSkipRef.current;
  }, []);

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  return [shouldSkip, skip] as const;
}
