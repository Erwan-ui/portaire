import React, { useState } from "react";
import Select from "react-select";
import "../components/CountrySelect.css";
import { options } from "../countries";

const CountrySelect = ({ countries }) => {
  return (
    <div>
      <label className="label">Country</label>
      <Select options={options} onChange={(opt) => console.log(opt.value)} />
    </div>
  );
};

export default CountrySelect;
