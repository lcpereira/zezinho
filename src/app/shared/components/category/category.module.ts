import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, NgxSkeletonLoaderModule],
  exports: [CategoryComponent],
})
export class CategoryModule {}
