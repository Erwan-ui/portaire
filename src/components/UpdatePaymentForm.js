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

  const [addressOneError, setAddressOneError] = useState(false);
  const [addressTwoError, setAddressTwoError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);

  const [triggerValidation, setTriggerValidation] = useState(false);

  // const handleInputChange = (field, value) => {
  //   console.log("hello");
  //   setTriggerValidation(false);

  //   if (field === "ccv") {
  //     setCcv(value);
  //   }

  //   switch (field) {
  //     case "cardNumber":
  //       let cleanCardNumber = value.replace(/\D/g, "");
  //       setCardNumber(cleanCardNumber);
  //       console.log(cardNumber);
  //       break;
  //     case "date":
  //       setDate(value);
  //       console.log(date);

  //       break;
  //     case "ccv":
  //       setCcv(value);
  //       console.log(ccv);

  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleChange = (event) => {
    if (event.target.name === "card_number") {
      setCardNumber(event.target.value);
    } else {
      dispatch(updateAddressOne(event.target.value));
    }
  };

  const inputChanged = () => {
    setTriggerValidation(false);
  };

  const validateFields = () => {
    if (user.currentUser.address_one === "") {
      setAddressOneError("Please enter an address");
    }
    if (user.currentUser.address_two === "") {
      setAddressTwoError("Please enter an address");
    }
    if (user.currentUser.state === "") {
      setStateError("Please enter a state");
    }
    if (user.currentUser.post_code === "") {
      setPostCodeError("Please enter a post code");
    }
  };

  const handleSubmit = async (event) => {
    validateFields();
    setTriggerValidation(true);

    event.preventDefault();

    try {
      const response = await fetch(
        "https://portaireapi.herokuapp.com/test/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.currentUser,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
            <CreditCardForm
              triggerValidation={triggerValidation}
              onInputChange={inputChanged}
            />
            <div
              className={`input-container ${
                addressOneError ? "invalid" : "mb-36"
              }`}
            >
              <div>
                <label className="label">Address line 1</label>
                <input
                  className={`custom-input ${
                    addressOneError ? "invalid" : ""
                  } `}
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
            {addressOneError && (
              <div className="error-container">
                <div className="error-message mb-36">{addressOneError}</div>
              </div>
            )}
            <div
              className={`input-container ${
                addressTwoError ? "invalid" : "mb-36"
              }`}
            >
              {" "}
              <div>
                <label className="label">Address line 2</label>
                <input
                  className={`custom-input ${
                    addressTwoError ? "invalid" : ""
                  } `}
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
            {addressTwoError && (
              <div className="error-container">
                <div className="error-message mb-36">{addressTwoError}</div>
              </div>
            )}

            <CountrySelect
              triggerValidation={triggerValidation}
            ></CountrySelect>
            <div className="localisation-container">
              <div className="blocktry">
                <div
                  className={`input-container ${
                    stateError ? "invalid" : "mb-36"
                  }`}
                >
                  {" "}
                  <div>
                    <label className="label">State</label>
                    <input
                      className={`custom-input ${stateError ? "invalid" : ""} `}
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
                {stateError && (
                  <div className="error-container">
                    <div className="error-message mb-36">{stateError}</div>
                  </div>
                )}
              </div>
              <div className="blocktry">
                <div
                  className={`input-container ${
                    postCodeError ? "invalid" : "mb-36"
                  }`}
                >
                  {" "}
                  <div>
                    <label className="label">Post Code</label>
                    <input
                      className={`custom-input ${
                        postCodeError ? "invalid" : ""
                      } `}
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
                {postCodeError && (
                  <div className="error-container">
                    <div className="error-message mb-36">{postCodeError}</div>
                  </div>
                )}
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
