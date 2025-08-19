import { useReducer } from "react";

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET_VALUE"; payload: number };

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "SET_VALUE":
      return { ...state, count: action.payload };
    default:
      return state;
  }
}

export function useImageNavigator() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  const reset = () => dispatch({ type: "RESET" });
  const setValue = (value: number) =>
    dispatch({ type: "SET_VALUE", payload: value });

  return {
    count: state.count,
    increment,
    decrement,
    reset,
    setValue,
  };
}
