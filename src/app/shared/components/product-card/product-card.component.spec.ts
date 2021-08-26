import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Product } from '@shared/interfaces/product';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let localStorageService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [NgxSkeletonLoaderModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    localStorageService = TestBed.inject(LocalStorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate if the product is at checkout - without product', () => {
    expect(component.isAtCheckout).toBeFalsy();
  });

  it('should validate if the product is at checkout - return null checkout', () => {
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(null);

    component.product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    expect(component.isAtCheckout).toBeFalsy();
  });

  it('should validate if the product is at checkout - return empty checkout', () => {
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue([]);

    component.product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    expect(component.isAtCheckout).toBeFalsy();
  });

  it('should validate if the product is at checkout - return product', () => {
    const product: Product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue([product]);

    component.product = product;

    expect(component.isAtCheckout).toBeTruthy();
  });

  it('should add product at checkout - with null checkout', () => {
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(null);
    jest.spyOn(localStorageService, 'setItem');

    const product: Product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    component.onCheckout(product);

    expect(localStorageService.setItem).toHaveBeenCalledWith(StorageKey.CHECKOUT, [product]);
  });

  it('should add product at checkout - with empty checkout', () => {
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue([]);
    jest.spyOn(localStorageService, 'setItem');

    const product: Product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    component.onCheckout(product);

    expect(localStorageService.setItem).toHaveBeenCalledWith(StorageKey.CHECKOUT, [product]);
  });

  it('should remove product at checkout', () => {
    const product: Product = {
      id: '123',
      images: [
        {
          url: 'http://image.jpg',
        },
      ],
      productVariants: [
        {
          price: 5,
        },
      ],
      title: 'Product test',
    };

    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue([product]);
    jest.spyOn(localStorageService, 'setItem');

    component.onCheckout(product);

    expect(localStorageService.setItem).toHaveBeenCalledWith(StorageKey.CHECKOUT, []);
  });
});
