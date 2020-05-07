import React from "react";
import { render } from "@testing-library/react";
import Index from "./index";

jest.mock("swr", () => {
    return () => ({
        data: { message: "test message" },
    });
});

test("renders deploy link", () => {
    const { getByText } = render(<Index hello="life is great" />);
    const header = getByText(/life is great/);
    expect(header).toBeInTheDocument();
});
