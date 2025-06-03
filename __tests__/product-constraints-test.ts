import { getProductConstraints } from "@/utils/validation/constraints/product";
import { validate } from "validate.js";

const t = (key: string, options?: any) => {
  if (key === "validation.length") {
    return `must be between ${options?.min} and ${options?.max} characters`;
  }
  const map: Record<string, string> = {
    "validation.required": "is required",
    "validation.invalidDate": "invalid date",
    "validation.invalidReleaseDate":
      "must be equal to or greater than the current date",
    "validation.invalidRevisionDate": "must be exactly one year after release",
  };
  return map[key] || key;
};

describe("getProductConstraints", () => {
  test("returns the expected constraints object", () => {
    const constraints = getProductConstraints(t);

    expect(constraints).toHaveProperty("id");
    expect(constraints).toHaveProperty("name");
    expect(constraints).toHaveProperty("description");
    expect(constraints).toHaveProperty("logo");
    expect(constraints).toHaveProperty("date_release");
    expect(constraints).toHaveProperty("date_revision");
  });

  test("validates customReleaseDate - invalid date format", () => {
    const constraints = getProductConstraints(t);
    const result = validate(
      { record: { date_revision: "2025-01-01" } },
      constraints,
    );
    expect(result?.date_release[0]).toBe("Date release is required");
  });

  test("validates customReleaseDate - past date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split("T")[0];

    const constraints = getProductConstraints(t);
    const result = validate(
      { date_release: dateStr, record: { date_revision: "2025-01-01" } },
      constraints,
    );
    expect(result?.date_release[0]).toBe(
      "Date release must be equal to or greater than the current date",
    );
  });

  test("validates customReleaseDate - today (valid)", () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const constraints = getProductConstraints(t);
    const result = validate(
      { date_release: todayStr, record: { date_revision: "2025-01-01" } },
      constraints,
    );
    expect(result?.date_release).toBeUndefined();
  });

  test("validates customRevisionDate - incorrect revision date", () => {
    const releaseDate = new Date();
    const revisionDate = new Date();
    revisionDate.setFullYear(releaseDate.getFullYear() + 1);
    revisionDate.setDate(revisionDate.getDate() + 1);

    const releaseStr = releaseDate.toISOString().split("T")[0];
    const revisionStr = revisionDate.toISOString().split("T")[0];

    const constraints = getProductConstraints(t);
    const result = validate(
      { date_revision: revisionStr, record: { date_release: releaseStr } },
      constraints,
    );
    expect(result?.date_revision[0]).toBe(
      "Date revision must be exactly one year after release",
    );
  });

  test("validates customRevisionDate - correct revision date (valid)", () => {
    const releaseDate = new Date();
    const revisionDate = new Date();
    revisionDate.setFullYear(releaseDate.getFullYear() + 1);

    const releaseStr = releaseDate.toISOString().split("T")[0];
    const revisionStr = revisionDate.toISOString().split("T")[0];

    const constraints = getProductConstraints(t);
    const result = validate(
      { date_revision: revisionStr, record: { date_release: releaseStr } },
      constraints,
    );
    expect(result?.date_revision).toBeUndefined();
  });
});
