import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../components/CountrySelect.css";
import { options } from "../countries";

import { useDispatch, useSelector } from "react-redux";

import { updateCountry } from "../redux/user";

const CountrySelect = ({ triggerValidation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [countryError, setCountryError] = useState(false);

  useEffect(() => {
    if (triggerValidation) {
      validateCountryField();
    }
  }, [triggerValidation]);

  const validateCountryField = () => {
    if (!user.currentUser.country) {
      setCountryError(true);
      console.log("whaouuu", user.currentUser.country);
    }
  };

  const borderStyle = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
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
