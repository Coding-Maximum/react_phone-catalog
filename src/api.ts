import { Devices } from "./types/devices";
import { Product } from "./types/products";

const BASE_URL = "./api";

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
export const getAllProducts = (params: string) => get<Devices[]>(`/${params}`);
export const getProductById = (id: string) =>
  get<Devices[]>("/phones").then((products) =>
    products.find((product) => product.id === id)
  );
