import * as api from "@/api/products";
import { Product } from "@/types/product";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const product: Product = {
  id: "1",
  name: "New Product",
  description: "New Description from product",
  logo: "test-logo.png",
  date_release: "2025-01-01",
  date_revision: "2026-01-01",
};

describe("products API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getProducts returns data on success", async () => {
    const mockData = { data: [product] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const products = await api.getProducts();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/bp/products`);
    expect(products).toEqual(mockData.data);
  });

  test("getProducts throws error on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(api.getProducts()).rejects.toThrow(
      "Error when loading products",
    );
  });

  test("getProductById returns product on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => product,
    });

    const product = await api.getProductById("1");

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/bp/products/1`);
    expect(product).toEqual(product);
  });

  test("getProductById throws error on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(api.getProductById("1")).rejects.toThrow(
      "Error in obtaining the product",
    );
  });

  test("saveProduct posts product and returns json on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => product,
    });

    const result = await api.saveProduct(product);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/bp/products`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }),
    );
    expect(result).toEqual(product);
  });

  test("saveProduct throws error on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(api.saveProduct(product)).rejects.toThrow(
      "Error when creating the product",
    );
  });

  test("updateProduct sends PUT and returns json on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => product,
    });

    const result = await api.updateProduct(product);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/bp/products/1`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }),
    );
    expect(result).toEqual(product);
  });

  test("updateProduct throws error on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(api.updateProduct(product)).rejects.toThrow(
      "Error updating the product",
    );
  });

  test("deleteProduct sends DELETE and resolves on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    await api.deleteProduct("1");

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/bp/products/1`, {
      method: "DELETE",
    });
  });

  test("deleteProduct throws error on bad response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(api.deleteProduct("1")).rejects.toThrow(
      "Error deleting product",
    );
  });
});
