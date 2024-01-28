import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Applications from "../Applications";
import { getApplication } from "../apiCalls/api";

import "@testing-library/jest-dom";

jest.mock("./apiCalls/api");

describe("Applications component", () => {
  beforeEach(() => {
    (getApplication as jest.Mock).mockResolvedValue([
      { id: 1, name: "Application 1" },
      { id: 2, name: "Application 2" },
    ]);
  });

  it("renders applications and load more button", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("Application 1")).toBeInTheDocument();
      expect(screen.getByText("Application 2")).toBeInTheDocument();
    });

    expect(screen.getByText("load more")).toBeInTheDocument();
  });

  it("loads more applications when load more button is clicked", async () => {
    render(<Applications />);

    await waitFor(() => {
      expect(screen.getByText("Application 1")).toBeInTheDocument();
      expect(screen.getByText("Application 2")).toBeInTheDocument();
    });

    (getApplication as jest.Mock).mockResolvedValue([
      { id: 3, name: "Application 3" },
      { id: 4, name: "Application 4" },
    ]);

    userEvent.click(screen.getByText("load more"));
    await waitFor(() => {
      expect(screen.getByText("Application 3")).toBeInTheDocument();
      expect(screen.getByText("Application 4")).toBeInTheDocument();
    });
  });

  it("handles error when fetching applications", async () => {
    (getApplication as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch applications")
    );

    render(<Applications />);
    await waitFor(() => {
      expect(
        screen.getByText("Error fetching applications:")
      ).toBeInTheDocument();
    });
  });
});
