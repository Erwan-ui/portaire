import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, wait } from "@testing-library/react";
import UpdatePaymentForm from "../components/UpdatePaymentForm";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user";
import { updateCardNumber } from "../redux/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

fetch.mockReturnValue(
  Promise.resolve(
    new Response([
      {
        _id: "63d2b0283c5c549fd2f97cb2",
        email: "john@doe.com",
        first_name: "Sherlock",
        last_name: "Holmes",
        address_one: "221b Baker St",
        address_two: "London",
        state: "London",
        post_code: "NW1 6XE",
        __v: 0,
      },
    ])
  )
);

test("UpdatePaymentForm component should render correctly", () => {
  const onClick = jest.fn();
  const { getByTestId } = render(
    <Provider store={store}>
      <UpdatePaymentForm onClick={onClick} />
    </Provider>
  );
  const title = getByTestId("title");
  const creditCardForm = getByTestId("credit-card-form");

  const addressOne = getByTestId("address-one");

  const addressTwo = getByTestId("address-two");

  const state = getByTestId("state");
  const postCode = getByTestId("post-code");
  const cancelBtn = getByTestId("button-cancel");
  const updateBtn = getByTestId("button-update");
  const stripeLogo = getByTestId("stripe-logo");

  expect(title).toBeInTheDocument();
  expect(creditCardForm).toBeInTheDocument();
  expect(addressOne).toBeInTheDocument();
  expect(addressTwo).toBeInTheDocument();
  expect(postCode).toBeInTheDocument();
  expect(cancelBtn).toBeInTheDocument();
  expect(updateBtn).toBeInTheDocument();
  expect(stripeLogo).toBeInTheDocument();

  expect(state).toBeInTheDocument();
});
