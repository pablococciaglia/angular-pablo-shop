export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: Tag[];
  images: string[];
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
  Unisex = 'unisex',
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}

export enum Tag {
  Hoodie = 'hoodie',
  Shirt = 'shirt',
}
