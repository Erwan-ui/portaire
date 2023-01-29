import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreditCardForm from "../components/CreditCardDetails";

describe("CreditCardForm component", () => {
  it("renders without crashing", () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);
    const cardNumberInput = getByPlaceholderText("Card Number");
    expect(cardNumberInput).toBeInTheDocument();
  });

  it("calls the onInputChange prop when card number input is focused", () => {
    const onInputChange = jest.fn();
    const { getByPlaceholderText } = render(
      <CreditCardForm onInputChange={onInputChange} />
    );
    const cardNumberInput = getByPlaceholderText("Card Number");
    fireEvent.focus(cardNumberInput);
    expect(onInputChange).toHaveBeenCalled();
  });
});
