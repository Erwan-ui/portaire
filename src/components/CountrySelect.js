/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../components/CountrySelect.css";
import { options } from "../countries";

import { useDispatch, useSelector } from "react-redux";

import { updateCountry, updateCountryValidationError } from "../redux/user";

const CountrySelect = ({ triggerValidation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [countryError, setCountryError] = useState(false);

  // Validate country field when triggerValidation is true
  useEffect(() => {
    if (triggerValidation) {
      validateCountryField();
    }
  }, [triggerValidation]);

  // Check if user's country field is empty
  const validateCountryField = () => {
    if (!user.currentUser.country) {
      setCountryError(true);
      dispatch(updateCountryValidationError(true));
    }
  };

  // Custom styles for select component
  const borderStyle = {
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
    }),
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: 50,
    }),
  };

  return (
    <div>
      <label data-testid="country-select" className="label">
        Country
      </label>
      <div>
        <Select
          className={`country-input ${countryError ? "invalid" : "mb-36"}`}
          placeholder={<div>Select a country</div>}
          options={options}
          id="country-select"
          onChange={(opt) => {
            dispatch(updateCountry(opt.value));
            setCountryError(false);
            dispatch(updateCountryValidationError(false));
          }}
          styles={borderStyle}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value} data-testid="CountryOption">
              {label}
            </option>
          ))}
        </Select>
        {countryError && (
          <div className="error-container">
            <div className="error-message mb-36">Please select a country</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelect;
