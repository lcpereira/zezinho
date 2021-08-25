import { Component, OnInit } from '@angular/core';
import { CategoriesQuery } from '@graphql/categories.query';
import { ProductsQuery } from '@graphql/products.query';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { CategoriesRequest, Category } from '@shared/interfaces/category';
import { Product, ProductsRequest } from '@shared/interfaces/product';
import { UserData } from '@shared/interfaces/user-data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  search: string | null = null;
  userData: UserData | null = null;
  category: Category | null = null;
  products$: Observable<Product[]> | null = null;
  categories$: Observable<Category[]> | null = null;

  constructor(
    private productsQuery: ProductsQuery,
    private categoriesQuery: CategoriesQuery,
    private localStorageService: LocalStorageService
  ) {}

  get currentCategory(): Category | null {
    return this.category;
  }

  ngOnInit(): void {
    const userData = this.localStorageService.getItemAsJSON<UserData>(StorageKey.USER_DATA);

    this.userData = userData;
    this.loadProducts();
    this.loadCategories();
  }

  onSearch(value: string): void {
    this.search = value;
    this.loadProducts();
  }

  onClickCategory(category: Category): void {
    if (this.category && this.category.id === category.id) {
      this.category = null;
    } else {
      this.category = category;
    }

    this.loadProducts();
  }

  private loadCategories(): void {
    if (!this.userData) {
      // caso não exista ou algum valor tenha sido alterado, poderia ir para a home refazer o processo
      return;
    }

    const variables: CategoriesRequest = {
      algorithm: 'NEAREST',
      lat: String(this.userData.latitude),
      long: String(this.userData.longitude),
      now: new Date().toISOString(),
    };

    this.categories$ = this.categoriesQuery
      .watch(variables)
      .valueChanges.pipe(map((result) => result.data.allCategory));
  }

  private loadProducts(): void {
    if (!this.userData) {
      // caso não exista ou algum valor tenha sido alterado, poderia ir para a home refazer o processo
      return;
    }

    const variables: ProductsRequest = {
      id: this.userData.id,
    };

    if (this.search) {
      variables.search = this.search;
    }

    if (this.category) {
      variables.categoryId = this.category.id;
    }

    this.products$ = this.productsQuery
      .watch(variables)
      .valueChanges.pipe(map((result) => result.data.poc.products));
  }
}
