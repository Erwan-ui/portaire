import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreditCardForm from "./CreditCardForm";

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

  it("validates the card number when input is blurred", () => {
    const { getByPlaceholderText } = render(
      <CreditCardForm triggerValidation />
    );
    const cardNumberInput = getByPlaceholderText("Card Number");
    fireEvent.blur(cardNumberInput);
    expect(cardNumberInput).toHaveClass("invalid");
  });
});
