import React from "react";
import "../components/CustomInput.css";
import { useDispatch, useSelector } from "react-redux";

import {
  updateAddressOne,
  updateAddressTwo,
  updateState,
  updatePostCode,
} from "../redux/user";

const CustomInput = ({ handleChange, label, placeHolder, field, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleInputChange = (e) => {
    switch (type) {
      case "address_one":
        dispatch(updateAddressOne(e.target.value));
        break;
      case "address_two":
        dispatch(updateAddressTwo(e.target.value));
        break;
      case "state":
        dispatch(updateState(e.target.value));
        break;
      case "post_code":
        dispatch(updatePostCode(e.target.value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="input-container">
      <div>
        <label className="label">{label}</label>
        <input
          className="custom-input"
          type="text"
          onChange={handleInputChange}
          placeholder={placeHolder}
          defaultValue={user[type]}
          name={user[type]}
        />
      </div>
    </div>
  );
};

export default CustomInput;
