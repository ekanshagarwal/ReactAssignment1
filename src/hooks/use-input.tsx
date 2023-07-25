import { useReducer} from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

enum CountActionKind {
  INPUT = "INPUT",
  BLUR = "BLUR",
  RESET = "RESET",
}

interface CountAction {
  type: CountActionKind;
  value: string;
}

interface CountState {
  value: string;
  isTouched: boolean;
}

const inputStateReducer = (state: CountState, action: CountAction) => {
  if (action.type === CountActionKind.INPUT) {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === CountActionKind.BLUR) {
    return { isTouched: true, value: state.value };
  }

  if (action.type === CountActionKind.RESET) {
    return { isTouched: false, value: "" };
  }

  return initialInputState;
};

const useInput = (validateValue: {(name:string) : boolean}) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: CountActionKind.INPUT, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: CountActionKind.BLUR, value: "" });
  };

  const reset = () => {
    dispatch({ type: CountActionKind.RESET, value: "" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
