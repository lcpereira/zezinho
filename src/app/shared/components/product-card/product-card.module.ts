import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductCardComponent } from './product-card.component';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, NgxSkeletonLoaderModule],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
