import { FormState } from "@/types/form";

export type Product = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

export type ProductResponse = {
  data: Product[];
};

export interface ProductValidities {
  id: boolean | undefined;
  name: boolean | undefined;
  description: boolean | undefined;
  logo: boolean | undefined;
  date_release: boolean | undefined;
  date_revision: boolean | undefined;
}

export type ProductFormState = FormState<Product, ProductValidities>;
