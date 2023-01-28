import React, { useState, useEffect } from "react";
import "../components/UpdatePaymentForm.css";
import stripe_logo from "../stripe-logo.png";

import CustomInput from "../components/CustomInput";
import CountrySelect from "../components/CountrySelect";
import CreditCardForm from "./CreditCardDetails";
import { useDispatch, useSelector } from "react-redux";

import {
  updateAddressOne,
  updateAddressTwo,
  updateState,
  updatePostCode,
  setUserData,
} from "../redux/user";

const UpdatePaymentForm = ({ onClick }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [ccv, setCcv] = useState("");

  const handleInputChange = (field, value) => {
    console.log(field);
    if (field === "ccv") {
      setCcv(value);
    }

    switch (field) {
      case "cardNumber":
        let cleanCardNumber = value.replace(/\D/g, "");
        setCardNumber(cleanCardNumber);
        console.log(cardNumber);
        break;
      case "date":
        setDate(value);
        console.log(date);

        break;
      case "ccv":
        setCcv(value);
        console.log(ccv);

        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "card_number") {
      setCardNumber(event.target.value);
    } else {
      dispatch(updateAddressOne(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user.currentUser);
  };

  const data = [
    {
      _id: "63d2b0283c5c549fd2f97cb2",
      email: "john@doe.com",
      first_name: "Sherlock",
      last_name: "Holmes",
      address_one: "221b Baker St",
      address_two: "London",
      state: "London",
      post_code: "NW1 6XE",
      __v: 0,
    },
  ];

  //   useEffect(() => {
  //     fetch('https://portaireapi.herokuapp.com/test/payment')
  //       .then(response => response.json())
  //       .then(data => {
  //           if(data.length > 1) {
  //             const randomIndex = Math.floor(Math.random() * data.length);
  //             setFormData(data[randomIndex]);
  //           } else {
  //             setFormData(data[0]);
  //           }
  //       })
  //       .catch(error => console.log(error));
  //   }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setFormData(data[0]);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setUserData(data[0]));
    }, 2000);
  }, [dispatch]);

  if (Object.keys(data[0]).length) {
    return (
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Update your payment method</h3>
            <CreditCardForm onInputChange={handleInputChange} />
            <div className="input-container">
              <div>
                <label className="label">Address line 1</label>
                <input
                  className="custom-input"
                  type="text"
                  onChange={(event) => {
                    dispatch(updateAddressOne(event.target.value));
                  }}
                  placeholder="e.g. 123 Fake St"
                  defaultValue={user.currentUser.address_one}
                  name={user.currentUser.address_one}
                />
              </div>
            </div>
            <div className="input-container">
              <div>
                <label className="label">Address line 2</label>
                <input
                  className="custom-input"
                  type="text"
                  onChange={(event) => {
                    dispatch(updateAddressTwo(event.target.value));
                  }}
                  placeholder="e.g. 123 Fake St"
                  defaultValue={user.currentUser.address_two}
                  name={user.currentUser.address_two}
                />
              </div>
            </div>

            <CountrySelect></CountrySelect>
            <div className="localisation-container">
              <div className="input-container">
                <div>
                  <label className="label">State</label>
                  <input
                    className="custom-input"
                    type="text"
                    onChange={(event) => {
                      dispatch(updateState(event.target.value));
                    }}
                    placeholder="e.g. Middlesex"
                    defaultValue={user.currentUser.state}
                    name={user.currentUser.state}
                  />
                </div>
              </div>
              <div className="input-container">
                <div>
                  <label className="label">Post Code</label>
                  <input
                    className="custom-input"
                    type="text"
                    onChange={(event) => {
                      dispatch(updatePostCode(event.target.value));
                    }}
                    placeholder="e.g. W11 1NS"
                    defaultValue={user.currentUser.post_code}
                    name={user.currentUser.post_code}
                  />
                </div>
              </div>
            </div>
            <div className="button-container">
              <button className="button" onClick={onClick}>
                Cancel
              </button>
              <button className="button-black" type="submit">
                Update
              </button>
            </div>
            <div className="logo-container">
              <img alt="stripe-logo" src={stripe_logo}></img>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UpdatePaymentForm;
