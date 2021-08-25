import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { UserData } from '@shared/interfaces/user-data';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  get location(): string | null {
    const userData = this.localStorageService.getItemAsJSON<UserData>(StorageKey.USER_DATA);

    if (userData) {
      let location = `${userData.streetName}, ${userData.streetNumber}`;

      if (userData.streetComplement) {
        location += ` - ${userData.streetComplement}`;
      }

      return location;
    }

    return null;
  }

  onRemoveUserData(): void {
    this.localStorageService.removeItem(StorageKey.USER_DATA);
    this.router.navigate(['home']);
  }
}
