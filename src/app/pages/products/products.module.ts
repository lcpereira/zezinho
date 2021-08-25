import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CategoryModule } from '@shared/components/category/category.module';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { ProductsSearchModule } from '@shared/components/products-search/products-search.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CategoryModule,
    ProductCardModule,
    ProductsSearchModule,
  ],
})
export class ProductsModule {}
