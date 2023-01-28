import React from "react";
import Select from "react-select";
import "../components/CountrySelect.css";
import { options } from "../countries";

import { useDispatch } from "react-redux";

import { updateCountry } from "../redux/user";

const CountrySelect = ({ countries }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <label className="label">Country</label>
      <Select
        options={options}
        onChange={(opt) => dispatch(updateCountry(opt.value))}
      />
    </div>
  );
};

export default CountrySelect;
