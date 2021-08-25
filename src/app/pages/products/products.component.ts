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
  products$: Observable<Product[]> | null = null;
  categories$: Observable<Category[]> | null = null;

  constructor(
    private productsQuery: ProductsQuery,
    private categoriesQuery: CategoriesQuery,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userData = this.localStorageService.getItemAsJSON<UserData>(StorageKey.USER_DATA);

    if (!userData) {
      // caso não exista ou algum valor tenha sido alterado, poderia ir para a home refazer o processo
      return;
    }

    this.loadProducts(userData);
    this.loadCategories(userData);
  }

  private loadCategories(userData: UserData): void {
    const variables: CategoriesRequest = {
      algorithm: 'NEAREST',
      lat: String(userData.latitude),
      long: String(userData.longitude),
      now: new Date().toISOString(),
    };

    this.categories$ = this.categoriesQuery
      .watch(variables)
      .valueChanges.pipe(map((result) => result.data.allCategory));
  }

  private loadProducts(userData: UserData, search?: string, categoryId?: string): void {
    const variables: ProductsRequest = {
      id: userData.id,
      search,
      categoryId,
    };

    this.products$ = this.productsQuery
      .watch(variables)
      .valueChanges.pipe(map((result) => result.data.poc.products));
  }
}
