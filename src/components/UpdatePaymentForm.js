import React, { useState, useEffect } from "react";
import "../components/UpdatePaymentForm.css";
import stripe_logo from "../assets/stripe-logo.png";

import CountrySelect from "../components/CountrySelect";
import CreditCardForm from "./CreditCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  updateAddressOne,
  updateAddressTwo,
  updateState,
  updatePostCode,
  setUserData,
} from "../redux/user";

// Component that displays a form for updating payment information
const UpdatePaymentForm = ({ onClick }) => {
  // Get user data from the redux store
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State to keep track of form field errors
  const [addressOneError, setAddressOneError] = useState(false);
  const [addressTwoError, setAddressTwoError] = useState(false);
  const [formData, setFormData] = useState("");
  const [stateError, setStateError] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);

  const [triggerValidation, setTriggerValidation] = useState(false);

  // Handle input change to reset errors
  const inputChanged = () => {
    setTriggerValidation(false);
  };

  // Function to validate form fields
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

  const showToastMessage = () => {
    toast.success("Your payment information has been updated succesfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    validateFields();
    setTriggerValidation(true);

    event.preventDefault();
    if (
      !(user.currentUser.address_one === "") &&
      !(user.currentUser.address_two === "") &&
      !(user.currentUser.state === "") &&
      !(user.currentUser.post_code === "") &&
      !user.errors.validationError &&
      !user.errors.countryValidationError
    ) {
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
      } catch (error) {
        console.error(error);
      }
      showToastMessage();
    }
  };

  // Fetch user data and update the redux store on component mount
  useEffect(() => {
    fetch("https://portaireapi.herokuapp.com/test/payment")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 1) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setFormData(data[randomIndex]);
          dispatch(setUserData(data[randomIndex]));
        } else {
          setFormData(data[0]);

          dispatch(setUserData(data[0]));
        }
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  if (Object.keys(formData).length) {
    return (
      <div className="container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <h3 className="title" data-testid="title">
              Update your payment method
            </h3>
            <div>
              <ToastContainer />
            </div>
            <CreditCardForm
              triggerValidation={triggerValidation}
              onInputChange={inputChanged}
              data-testid="credit-card-form"
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
                  onFocus={() => {
                    setAddressOneError(false);
                  }}
                  defaultValue={user.currentUser.address_one}
                  name={user.currentUser.address_one}
                  data-testid="address-one"
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
                  onFocus={() => {
                    setAddressTwoError(false);
                  }}
                  data-testid="address-two"
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
              <div className={`input-container ${stateError ? "" : "mb-36"}`}>
                {" "}
                <div>
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
                      onFocus={() => {
                        setStateError(false);
                      }}
                      name={user.currentUser.state}
                      data-testid="state"
                    />
                  </div>
                </div>
                {stateError && (
                  <div className="error-container">
                    <div className="error-message mb-36">{stateError}</div>
                  </div>
                )}
              </div>
              <div
                className={`input-container ${postCodeError ? "" : "mb-36"}`}
              >
                {" "}
                <div>
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
                      onFocus={() => {
                        setPostCodeError(false);
                      }}
                      defaultValue={user.currentUser.post_code}
                      name={user.currentUser.post_code}
                      data-testid="post-code"
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
              <button
                className="button"
                onClick={onClick}
                data-testid="button-cancel"
              >
                Cancel
              </button>
              <button
                className="button-black"
                type="submit"
                data-testid="button-update"
              >
                Update
              </button>
            </div>
            <div className="logo-container" data-testid="stripe-logo">
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
