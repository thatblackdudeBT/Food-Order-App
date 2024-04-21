import { Fragment, useState } from "react";

import useInputHook from "../../hooks/use-inputHook";
import classes from "./CheckOutForm.module.css";

const ChechOutForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useInputHook((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityIsInvalid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetInput: resetCity,
  } = useInputHook((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressIsInvalid,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    resetInput: resetAddress,
  } = useInputHook((value) => value.trim() !== "");

  const submitHandler = (event) => {
    event.preventDefault();

    if (nameIsValid && addressIsValid && cityIsValid) {
      setFormIsValid(true);
    }

    if (!formIsValid) {
      return;
    }

    const enteredData = {
      name: enteredName,
      city: enteredCity,
      address: enteredAddress,
    };
    console.log(enteredData);

    // props.onOrder(enteredData);

    resetName();
    resetCity();
    resetAddress();
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            nameIsInvalid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
        </div>
        {nameIsInvalid && <p>Please, enter a valid Firstname!</p>}
        <div
          className={`${classes.control} ${
            cityIsInvalid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={enteredCity}
          />
        </div>
        {cityIsInvalid && <p>Please, enter a valid city!</p>}
        <div
          className={`${classes.control} ${
            addressIsInvalid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="address">
            Home Address (Invalid address will result in order canceled)
          </label>
          <input
            type="text"
            id="address"
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
            value={enteredAddress}
          />
        </div>
        {addressIsInvalid && <p>Please, enter a valid Home address</p>}
        <div className={classes.actions}>
          <div>
            <button onClick={props.onClick}>Close</button>
          </div>
          <div>
            <button disabled={!formIsValid} className={classes.submit}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ChechOutForm;
