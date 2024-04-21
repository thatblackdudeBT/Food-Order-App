import { useState } from "react";

const useInputHook = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const inputIsInvalid = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    IsValid: valueIsValid,
    hasError: inputIsInvalid,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInputHook;
