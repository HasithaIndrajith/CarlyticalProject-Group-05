import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  console.log(render(<App />));
  const linkElement = screen.getByText(/Hey/i);
  expect(linkElement).toBeTruthy();
});
