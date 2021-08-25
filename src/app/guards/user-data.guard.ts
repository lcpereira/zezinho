import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { LocalStorageService } from '@services/local-storage.service';
import { UserData } from '@shared/interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserDataGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isHome = state.url === '/home';
    const isProducts = state.url === '/products';
    const hasUserData = this.localStorageService.getItemAsJSON<UserData>(StorageKey.USER_DATA);

    if (isHome && hasUserData) {
      this.router.navigate(['products']);
      return false;
    } else if (isProducts && !hasUserData) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
