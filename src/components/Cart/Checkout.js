import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    console.log("confirm");
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredName,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });
    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalcode: enteredPostal,
    });
  };
  return (
    <form onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidity.name ? "" : classes.inValid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.street ? "" : classes.isValid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.postal ? "" : classes.isValid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && (
          <p>please enter a valid postal code( five charactor more)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputValidity.city ? "" : classes.isValid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
