import { Constraints } from "@/types/contraints";
import { validate } from "validate.js";

const registerCustomValidators = (t: (key: string) => string) => {
  (validate as any).validators.customReleaseDate = function (value: string) {
    const today = new Date();
    const inputDate = new Date(value);
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (isNaN(inputDate.getTime())) {
      return t("validation.invalidDate");
    }

    if (inputDate < today) {
      return t("validation.invalidReleaseDate");
    }

    return undefined;
  };

  (validate as any).validators.customRevisionDate = function (
    value: string,
    options: any,
    key: string,
    attributes: any,
  ) {
    const releaseDate = new Date(attributes.record?.date_release);
    const revisionDate = new Date(value);
    if (
      revisionDate.getFullYear() !== releaseDate.getFullYear() + 1 ||
      revisionDate.getMonth() !== releaseDate.getMonth() ||
      revisionDate.getDate() !== releaseDate.getDate()
    ) {
      return t("validation.invalidRevisionDate");
    }

    return undefined;
  };
};

export const getProductConstraints = (
  t: (key: string, options?: any) => string,
): Constraints => {
  registerCustomValidators(t);
  return {
    id: {
      presence: { allowEmpty: false, message: t("validation.required") },
      length: {
        minimum: 3,
        maximum: 10,
        message: t("validation.length", { min: 3, max: 10 }),
      },
    },
    name: {
      presence: { allowEmpty: false, message: t("validation.required") },
      length: {
        minimum: 5,
        maximum: 100,
        message: t("validation.length", { min: 5, max: 100 }),
      },
    },
    description: {
      presence: { allowEmpty: false, message: t("validation.required") },
      length: {
        minimum: 10,
        maximum: 200,
        message: t("validation.length", { min: 10, max: 200 }),
      },
    },
    logo: {
      presence: { allowEmpty: false, message: t("validation.required") },
    },
    date_release: {
      presence: { allowEmpty: false, message: t("validation.required") },
      customReleaseDate: true,
    },
    date_revision: {
      presence: { allowEmpty: false, message: t("validation.required") },
      customRevisionDate: true,
    },
  };
};
