import { Product, Size } from "./product.interface";

export interface CartProdcut extends Pick<Product, 'id' | 'slug' | 'title' | 'price'> {
  quantity: number;
  size: Size;
  image: string;
}