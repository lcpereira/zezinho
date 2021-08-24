import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isHome = state.url === '/home';
    const isProducts = state.url === '/products';
    const hasLocationStorage = this.localStorageService.getItemAsJSON<Location>(
      StorageKey.LOCATION
    );

    if (isHome && hasLocationStorage) {
      this.router.navigate(['products']);
      return false;
    } else if (isProducts && !hasLocationStorage) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
