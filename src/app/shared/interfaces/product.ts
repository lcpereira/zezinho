export interface ProductImage {
  url: string;
}

export interface ProductVariant {
  price: number;
}

export interface Product {
  id: string;
  title: string;
  rgb: boolean;
  images: ProductImage[];
  productVariants: ProductVariant[];
}

export interface ProductsResponse {
  poc: {
    id: string;
    products: Product[];
  };
}

export interface ProductsRequest {
  id: string;
  search?: string;
  categoryId?: string;
}
