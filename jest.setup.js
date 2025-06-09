/* eslint-disable no-undef */
import { load } from "@expo/env";

load(process.cwd(), { silent: true });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ value, onChange, testID }) => {
      return React.createElement("DateTimePicker", {
        testID: testID || "date-picker",
        value: value || new Date(),
        onChange: onChange || (() => {}),
      });
    }),
  };
});

jest.mock("expo-font");
