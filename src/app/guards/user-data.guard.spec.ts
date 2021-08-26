import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@services/local-storage.service';
import { UserData } from '@shared/interfaces/user-data';
import { UserDataGuard } from './user-data.guard';

const mock = <T, P extends keyof T>(obj: Pick<T, P>): T => obj as T;

const route = mock<ActivatedRouteSnapshot, 'params'>({
  params: {},
});

const state = (url: string) => {
  return mock<RouterStateSnapshot, 'url' | 'root'>({
    url,
    root: route,
  });
};

const userData: UserData = {
  id: '123',
  latitude: 1,
  longitude: 2,
  streetComplement: 'Street complement',
  streetName: 'Street Name',
  streetNumber: 111,
};

describe('UserDataGuard', () => {
  let guard: UserDataGuard;
  let router: Router;
  let localStorageService: LocalStorageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [UserDataGuard],
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(UserDataGuard);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should remain on the home page when there is no user data', () => {
    jest.spyOn(router, 'navigate').mockReturnThis();

    expect(guard.canActivate(route, state('/home'))).toBeTruthy();
    expect(router.navigate).not.toBeCalled();
  });

  it('should browse for products when you have user data on the home page', () => {
    jest.spyOn(router, 'navigate').mockReturnThis();
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(userData);

    expect(guard.canActivate(route, state('/home'))).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['products']);
  });

  it('should must remain on the product page when there is user data', () => {
    jest.spyOn(router, 'navigate').mockReturnThis();
    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(userData);

    expect(guard.canActivate(route, state('/products'))).toBeTruthy();
    expect(router.navigate).not.toBeCalled();
  });

  it("should browse for home when you don't have user data on the products page", () => {
    jest.spyOn(router, 'navigate').mockReturnThis();

    expect(guard.canActivate(route, state('/products'))).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
