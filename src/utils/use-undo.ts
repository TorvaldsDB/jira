import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  pasts: T[];
  present: T;
  features: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { pasts, present, features } = state;
  const { type, newPresent } = action;

  switch (type) {
    case UNDO: {
      if (pasts.length === 0) return state;

      const previous = pasts[pasts.length - 1];
      const newPasts = pasts.slice(0, pasts.length - 1);

      return {
        pasts: newPasts,
        present: previous,
        features: [present, ...features],
      };
    }

    case REDO: {
      if (features.length === 0) return state;

      const next = features[0];
      const newFeatures = features.slice(1);

      return {
        pasts: [...pasts, present],
        present: next,
        features: newFeatures,
      };
    }

    case SET: {
      if (newPresent === present) return state;

      return {
        pasts: [...pasts, present],
        present: newPresent,
        features: [],
      };
    }

    case RESET: {
      return {
        pasts: [],
        present: newPresent,
        features: [],
      };
    }

    default: {
      return state;
    }
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    pasts: [],
    present: initialPresent,
    features: [],
  } as State<T>);

  const canUndo = state.pasts.length !== 0;
  const canRedo = state.features.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [{ state }, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
