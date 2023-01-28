import React, { useState } from "react";
import Select from "react-select";
import "../components/CountrySelect.css";

const CountrySelect = ({ countries }) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <label className="label">Country</label>
      <Select
        options={options}
        onChange={(opt) => console.log(opt.label, opt.value)}
      />
    </div>
  );
};

export default CountrySelect;
