import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CountrySelect from "../components/CountrySelect";
import { options } from "../countries";
import { updateCountry } from "../redux/user";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

describe("CountrySelect component", () => {
  it("renders correctly and dispatches updateCountry action", () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<CountrySelect />);

    const select = getByTestId("country-select");
    const option = getByTestId("CountryOption").firstChild;
    fireEvent.change(select, { target: { value: option.value } });

    expect(dispatch).toHaveBeenCalledWith(updateCountry(option.value));
  });
});
