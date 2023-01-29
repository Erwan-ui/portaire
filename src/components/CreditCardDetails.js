import React, { useState, useEffect } from "react";
import card_logo from "../assets/card_logo.svg";
import InputMask from "react-input-mask";
import "../components/CreditCardDetails.css";

import { useDispatch, useSelector } from "react-redux";

import {
  updateCardNumber,
  updateExpirationDate,
  updateCCV,
} from "../redux/user";

// CreditCardForm component to display credit card form
const CreditCardForm = ({ onInputChange, triggerValidation }) => {
  // Select user from state
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // State to store the values of card number, date and ccv
  const [val, setVal] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);

  // Validate card number, date, and ccv on triggerValidation change
  useEffect(() => {
    if (triggerValidation) {
      validateCardField();
    }
  }, [triggerValidation]);

  // Update card number in state on change
  const handleCardNumberChange = (e) => {
    setVal(e.target.value);
    dispatch(updateCardNumber(e.target.value.replace(/\D/g, "")));
  };

  // Update date in state on change
  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch(updateExpirationDate(e.target.value));
  };

  // Update ccv in state on change
  const handleCCVChange = (e) => {
    setCcv(e.target.value);
    dispatch(updateCCV(e.target.value));
  };

  // Remove card number error on input focus
  const handleFocus = (e) => {
    setCardNumberError(false);
    onInputChange();
  };

  // Luhn algorithm for card number validation
  var validateLuhn = (function (arr) {
    return function (ccNum) {
      var len = ccNum.length,
        bit = 1,
        sum = 0,
        val;

      while (len) {
        val = parseInt(ccNum.charAt(--len), 10);
        sum += (bit ^= 1) ? arr[val] : val;
      }

      return sum && sum % 10 === 0;
    };
  })([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

  // Validate card number, date, and ccv
  const validateCardField = () => {
    if (
      val.replace(/\D/g, "").length > 0 ||
      ccv.length > 0 ||
      date.length > 0 ||
      triggerValidation
    ) {
      let cardError = val.length < 16 || !validateLuhn(val.replace(/\D/g, ""));
      let dateError = date.length < 5;
      let ccvError = ccv.length < 3;
      if (cardError) {
        setCardNumberError(true);
        setErrorMessage("Card Number Incorrect");
      } else if (dateError) {
        setCardNumberError(true);
        setErrorMessage("Expiration date incorrect");
      } else if (ccvError) {
        setCardNumberError(true);
        setErrorMessage("CCV incorrect");
      } else {
        setCardNumberError(false);
      }
    }
  };

  const handleCardNumberBlur = (e) => {
    validateCardField();
  };

  return (
    <div>
      <div
        className={`credit-card-input ${cardNumberError ? "invalid" : "mb-36"}`}
      >
        <div className="left-block">
          <img alt="card logo" className="icon" src={card_logo}></img>
          <InputMask
            className="card-number-input"
            mask="9999 9999 9999 9999"
            value={val}
            onChange={handleCardNumberChange}
            onBlur={handleCardNumberBlur}
            onFocus={handleFocus}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                placeholder="Card Number"
                className="card-number-input"
                maxLength={20}
              />
            )}
          </InputMask>
        </div>
        <div className="right-block">
          <InputMask
            className="date-input"
            mask="99/99"
            value={date}
            onChange={handleDateChange}
            onBlur={handleCardNumberBlur}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                placeholder="MM/YY"
                className="date-input"
              />
            )}
          </InputMask>

          <input
            className="ccv-input"
            type="text"
            id="ccv"
            placeholder="CCV"
            onBlur={handleCardNumberBlur}
            maxLength={3}
            value={ccv}
            onChange={handleCCVChange}
          ></input>
        </div>
      </div>
      {cardNumberError && (
        <div className="error-container">
          <div className="error-message mb-36">{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default CreditCardForm;
