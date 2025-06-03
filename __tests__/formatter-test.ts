import { getStringDate } from "@/utils/formatter";

describe("getStringDate", () => {
  test("formats a date as YYYY-MM-DD", () => {
    const date = new Date(Date.UTC(2024, 4, 9));
    const result = getStringDate(date);
    expect(result).toBe("2024-05-09");
  });

  test("pads day and month with leading zeros", () => {
    const date = new Date(Date.UTC(2024, 0, 1));
    const result = getStringDate(date);
    expect(result).toBe("2024-01-01");
  });
});
