import React, { useState } from "react";
import card_logo from "../card_logo.svg";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCardNumber,
  updateExpirationDate,
  updateCCV,
} from "../redux/user";

const CreditCardForm = ({ onInputChange }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");

  const handleCardNumberChange = (e) => {
    setVal(e.target.value);
    dispatch(updateCardNumber(e.target.value.replace(/\D/g, "")));
    console.log("userado", user.currentUser);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch(updateExpirationDate(e.target.value));
  };

  const handleCCVChange = (e) => {
    setCcv(e.target.value);
    dispatch(updateCCV(e.target.value));
  };
  return (
    <div className="credit-card-input">
      <div className="left-block">
        <img alt="card logo" className="icon" src={card_logo}></img>
        <InputMask
          className="card-number-input"
          mask="9999 9999 9999 9999"
          value={val}
          onChange={handleCardNumberChange}
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
          maxLength={3}
          value={ccv}
          onChange={handleCCVChange}
        ></input>
      </div>
    </div>
  );
};

export default CreditCardForm;
