import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page heading", () => {
  render(<App />);
  const linkElement = screen.getByText(/welcome back/i);
  expect(linkElement).toBeInTheDocument();
});
