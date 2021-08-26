import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchComponent } from './products-search.component';

describe('ProductsSearchComponent', () => {
  let component: ProductsSearchComponent;
  let fixture: ComponentFixture<ProductsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event search', (done) => {
    jest.spyOn(component.search, 'emit');

    component.onSearch('Test Search');

    // timeout por conta do debouce, até emitir o evento
    setTimeout(() => {
      expect(component.search.emit).toHaveBeenCalledWith('Test Search');
      done();
    }, 500);
  });
});
