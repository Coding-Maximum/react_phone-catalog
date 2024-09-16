import { Phone } from "./types/phone";
import { Product } from "./types/products";

const BASE_URL = "http://localhost:5173/api";

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + ".json";

  return wait(300)
    .then(() => fetch(fullURL))
    .then((res) => res.json());
}

export const getProducts = () => get<Product[]>("/products");
export const getAllProducts = (params: string) => get<Phone[]>(`/${params}`);
export const getProductById = (id: string) =>
  get<Phone[]>("/phones").then((products) =>
    products.find((product) => product.id === id)
  );
