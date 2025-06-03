import DateTimePicker from "@/components/DateTimePicker";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("DateTimePicker", () => {
  const baseProps = {
    displayValue: "2025-06-02",
    isVisible: false,
    showPicker: jest.fn(),
    hidePicker: jest.fn(),
    onGetValue: jest.fn(),
    mode: "date" as const,
    value: new Date("2025-06-02"),
    testID: "date-picker",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with title and value", () => {
    const { getByText } = render(
      <DateTimePicker {...baseProps} title="Fecha de lanzamiento" />
    );

    expect(getByText("Fecha de lanzamiento")).toBeTruthy();
    expect(getByText("2025-06-02")).toBeTruthy();
  });

  it("renders error text if provided", () => {
    const { getByText } = render(
      <DateTimePicker {...baseProps} errorText="Campo requerido" />
    );

    expect(getByText("Campo requerido")).toBeTruthy();
  });

  it("calls showPicker when touched", () => {
    const { getByTestId } = render(<DateTimePicker {...baseProps} />);

    fireEvent.press(getByTestId("date-picker"));
    expect(baseProps.showPicker).toHaveBeenCalled();
  });
});
