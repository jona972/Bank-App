import { images } from "@/constants/Images";
import { Product, ProductFormState, ProductValidities } from "@/types/product";

export const formatInitialValues = (
  product: Product | undefined,
  productFormState: ProductFormState,
) => {
  const initialValidities = product
    ? Object.keys(productFormState.inputValidities).reduce((acc, key) => {
        acc[key as keyof Product] = undefined;
        return acc;
      }, {} as ProductValidities)
    : productFormState.inputValidities;

  return {
    inputValidities: initialValidities,
    formIsValid: !!product,
    inputValues: product || productFormState.inputValues,
  };
};

export const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const getValidImage = (imageUrl: string | undefined) => {
  return imageUrl && isValidUrl(imageUrl) ? { uri: imageUrl } : images.noImage;
};
