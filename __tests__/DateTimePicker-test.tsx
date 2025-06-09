import DateTimePicker from "@/components/DateTimePicker";
import { getStringDate } from "@/utils/formatter";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

describe("<DateTimePicker />", () => {
  const currenDate = new Date();
  const dateFormat = getStringDate(currenDate);

  const baseProps = {
    displayValue: dateFormat,
    isVisible: false,
    showPicker: jest.fn(),
    hidePicker: jest.fn(),
    onGetValue: jest.fn(),
    onChange: jest.fn(),
    mode: "date" as const,
    value: currenDate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with title and value", () => {
    const { getByText } = render(
      <DateTimePicker {...baseProps} title="fields.date_release" />,
    );

    expect(getByText("fields.date_release")).toBeTruthy();
    expect(getByText(dateFormat)).toBeTruthy();
  });

  test("renders error text if provided", () => {
    const { getByText } = render(
      <DateTimePicker {...baseProps} errorText="is required" />,
    );

    expect(getByText("is required")).toBeTruthy();
  });

  test("calls showPicker when touched", () => {
    const { getByText } = render(<DateTimePicker {...baseProps} />);

    fireEvent.press(getByText(dateFormat));
    expect(baseProps.showPicker).toHaveBeenCalled();
  });

  test("renders DateTimePicker when isVisible is true", () => {
    const { getByTestId } = render(
      <DateTimePicker {...baseProps} isVisible={true} />,
    );

    expect(getByTestId("date-picker")).toBeTruthy();
  });

  test("calls onGetValue and onChange when date is selected", () => {
    const { getByTestId } = render(
      <DateTimePicker {...baseProps} isVisible={true} />,
    );
    const picker = getByTestId("date-picker");

    fireEvent(picker, "onChange", { type: "set" }, currenDate);

    expect(baseProps.onChange).toHaveBeenCalledWith(
      { type: "set" },
      currenDate,
    );
    expect(baseProps.hidePicker).toHaveBeenCalled();
    expect(baseProps.onGetValue).toHaveBeenCalledWith(dateFormat);
  });
});
