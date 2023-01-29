import React from "react";
import { render, cleanup } from "@testing-library/react";
import Home from "../components/Home";

afterEach(cleanup);

test("Home component should render correctly", () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Home onClick={onClick} />);
  const homeButton = getByTestId("home-button");

  expect(homeButton).toBeInTheDocument();
});
