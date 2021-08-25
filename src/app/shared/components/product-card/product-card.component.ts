import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Product } from '@shared/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product | null = null;

  constructor(private localStorageService: LocalStorageService) {}

  get isAtCheckout(): boolean {
    if (!this.product) {
      return false;
    }

    return this.findIndexItemOnCheckout(this.product) !== -1;
  }

  onCheckout(product: Product): void {
    let itemsCheckout = this.localStorageService.getItemAsJSON<Product[]>(StorageKey.CHECKOUT);

    if (!itemsCheckout) {
      itemsCheckout = [product];
    } else {
      const indexItemOnCheckout = itemsCheckout.findIndex(
        (itemCheckout) => itemCheckout.id === product.id
      );

      if (indexItemOnCheckout !== -1) {
        itemsCheckout.splice(indexItemOnCheckout, 1);
      } else {
        itemsCheckout.push(product);
      }
    }

    this.localStorageService.setItem(StorageKey.CHECKOUT, itemsCheckout);
  }

  private findIndexItemOnCheckout(product: Product): number {
    let itemsCheckout = this.localStorageService.getItemAsJSON<Product[]>(StorageKey.CHECKOUT);

    if (!itemsCheckout) {
      return -1;
    }

    return itemsCheckout.findIndex((itemCheckout) => itemCheckout.id === product.id);
  }
}
