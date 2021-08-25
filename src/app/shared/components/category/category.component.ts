import { Component, Input } from '@angular/core';
import { Category } from '@shared/interfaces/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: Category | null = null;
  @Input() active: boolean = false;

  constructor() {}
}
