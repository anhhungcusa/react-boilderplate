import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useMergedState = <T>(
  initialValues: T,
): [
  T,
  (values: Partial<T> | ((values: Partial<T>) => Partial<T>)) => void,
  React.Dispatch<React.SetStateAction<T>>,
  React.MutableRefObject<T>,
] => {
  const [state, setState] = useState<T>(initialValues);
  const stateRef = useRef<T>(initialValues);
  const updateState = useCallback((values: Partial<T> | ((values: Partial<T>) => Partial<T>)) => {
    setState((prev) => {
      if (typeof values === 'function') {
        const updated = values(prev);
        return { ...prev, ...updated };
      }
      return { ...prev, ...values };
    });
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return [state, updateState, setState, stateRef];
};
