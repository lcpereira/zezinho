import { TestBed, waitForAsync } from '@angular/core/testing';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Product } from '@shared/interfaces/product';
import { UserData } from '@shared/interfaces/user-data';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [LocalStorageService],
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get item', () => {
    localStorage.setItem(StorageKey.USER_DATA, 'Fake Value');
    expect(service.getItem(StorageKey.USER_DATA)).toEqual('Fake Value');
  });

  it('should get item as JSON', () => {
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

    service.setItem(StorageKey.CHECKOUT, [product]);

    expect(service.getItemAsJSON(StorageKey.CHECKOUT)).toEqual([product]);
  });

  it('should remove item', () => {
    const userData: UserData = {
      id: '123',
      latitude: 1,
      longitude: 2,
      streetComplement: 'Street complement',
      streetName: 'Street Name',
      streetNumber: 111,
    };

    service.setItem(StorageKey.USER_DATA, userData);
    service.removeItem(StorageKey.USER_DATA);

    expect(service.getItemAsJSON(StorageKey.USER_DATA)).toBeNull();
  });
});
