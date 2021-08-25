import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CategoryModule } from '@shared/components/category/category.module';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, CategoryModule, ProductCardModule],
})
export class ProductsModule {}
