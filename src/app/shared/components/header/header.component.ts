import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Location } from '@shared/interfaces/location';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  get location(): string | null {
    const locationStorage = this.localStorageService.getItemAsJSON<Location>(StorageKey.LOCATION);

    if (locationStorage) {
      let location = `${locationStorage.streetName}, ${locationStorage.streetNumber}`;

      if (locationStorage.streetComplement) {
        location += ` - ${locationStorage.streetComplement}`;
      }

      return location;
    }

    return null;
  }

  onRemoveLocation(): void {
    this.localStorageService.removeItem(StorageKey.LOCATION);
    this.router.navigate(['home']);
  }
}
