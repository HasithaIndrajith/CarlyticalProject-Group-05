import { screen, render } from "@testing-library/react";
import Login from "../../pages/login";

describe("Test the Login component", () => {
  test("renders learn react link", async() => {
    render(<Login />);
    const linkElement = await screen.findAllByRole("heading");
    console.log(linkElement);
    expect(linkElement).toHaveLength(1);
  });
});
