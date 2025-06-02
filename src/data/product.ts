import { ProductFormState } from "@/types/product";

export const productFormState: ProductFormState = {
  inputValues: {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  },
  inputValidities: {
    id: false,
    name: false,
    description: false,
    logo: false,
    date_release: false,
    date_revision: false,
  },
  formIsValid: false,
};
