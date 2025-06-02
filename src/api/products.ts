import { Product, ProductResponse } from "@/types/product";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/bp/products`);
  if (!res.ok) throw new Error("Error when loading products");
  const json: ProductResponse = await res.json();
  return json.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/bp/products/${id}`);
  if (!res.ok) throw new Error("Error in obtaining the product");
  const data: Product = await res.json();
  return data ?? {};
};

export const saveProduct = async (product: Product) => {
  const response = await fetch(`${API_URL}/bp/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error when creating the product");
  }

  return response.json();
};

export const updateProduct = async (product: Product) => {
  const res = await fetch(`${API_URL}/bp/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error updating the product");
  return res.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/bp/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting product");
};
