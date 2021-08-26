import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryModule } from '@shared/components/category/category.module';
import { ProductCardModule } from '@shared/components/product-card/product-card.module';
import { ProductsSearchModule } from '@shared/components/products-search/products-search.module';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [CategoryModule, ProductCardModule, ProductsSearchModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
