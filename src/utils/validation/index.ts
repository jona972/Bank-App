import { Constraints } from "@/types/contraints";
import { validate } from "validate.js";

export const validateData = (
  id: string,
  value: string,
  t: (key: string) => string,
  constraints: Constraints,
): string | undefined => {
  const validationResult = validate(
    { [id]: value },
    { [id]: constraints[id] },
    {
      fullMessages: false,
    },
  );
  return (
    validationResult &&
    `${`${t(`fields.${id}`)} ` || ""}${validationResult[id]?.[0]}`
  );
};
