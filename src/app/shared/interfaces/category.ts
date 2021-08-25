export interface Category {
  id: string;
  title: string;
}

export interface CategoriesResponse {
  allCategory: Category[];
}

export interface CategoriesRequest {
  algorithm: string;
  lat: string;
  long: string;
  now: string;
}
