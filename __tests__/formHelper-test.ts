import { images } from "@/constants/Images";
import { productFormState } from "@/data/product";
import { Product } from "@/types/product";
import {
  formatInitialValues,
  getValidImage,
  isValidUrl,
} from "@/utils/formHelper";

describe("formHelper utils", () => {
  describe("formatInitialValues", () => {
    const product: Product = {
      id: "1",
      name: "New Product",
      description: "New Description from product",
      logo: "test-logo.png",
      date_release: "2025-01-01",
      date_revision: "2026-01-01",
    };

    test("returns initial values for an existing product", () => {
      const result = formatInitialValues(product, productFormState);

      expect(result.formIsValid).toBe(true);
      expect(result.inputValues).toBe(product);
      expect(result.inputValidities).toEqual({
        name: undefined,
        price: undefined,
        imageUrl: undefined,
      });
    });

    test("returns default values when no product is provided", () => {
      const result = formatInitialValues(undefined, productFormState);

      expect(result.formIsValid).toBe(false);
      expect(result.inputValues).toBe(productFormState.inputValues);
      expect(result.inputValidities).toBe(productFormState.inputValidities);
    });
  });

  describe("isValidUrl", () => {
    test("returns true for a valid URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
    });

    test("returns false for an invalid URL", () => {
      expect(isValidUrl("invalid-url")).toBe(false);
    });
  });

  describe("getValidImage", () => {
    test("returns image URI when valid URL is provided", () => {
      const result = getValidImage("https://example.com/image.png");
      expect(result).toEqual({ uri: "https://example.com/image.png" });
    });

    test("returns fallback image when URL is invalid", () => {
      const result = getValidImage("not-a-valid-url");
      expect(result).toBe(images.noImage);
    });

    test("returns fallback image when URL is undefined", () => {
      const result = getValidImage(undefined);
      expect(result).toBe(images.noImage);
    });
  });
});
