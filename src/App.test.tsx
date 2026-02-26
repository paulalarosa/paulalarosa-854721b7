import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("App Smoke Test", () => {
  it("renders the application without crashing", async () => {
    render(<App />);

    await waitFor(() => {
      const titleElements = screen.getAllByText(/Paula La Rosa/i);
      expect(titleElements.length).toBeGreaterThan(0);
    });

    const navElement = screen.getByRole("banner");
    expect(navElement).toBeInTheDocument();
  });
});
