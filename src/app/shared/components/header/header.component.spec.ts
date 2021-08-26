import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { UserData } from '@shared/interfaces/user-data';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get location without street complement', () => {
    const userData: UserData = {
      id: '123',
      latitude: 1,
      longitude: 2,
      streetName: 'Street Name',
      streetNumber: 111,
    };

    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(userData);

    expect(component.location).toEqual(`${userData.streetName}, ${userData.streetNumber}`);
  });

  it('should get location with street complement', () => {
    const userData: UserData = {
      id: '123',
      latitude: 1,
      longitude: 2,
      streetComplement: 'Street complement',
      streetName: 'Street Name',
      streetNumber: 111,
    };

    jest.spyOn(localStorageService, 'getItemAsJSON').mockReturnValue(userData);

    expect(component.location).toEqual(
      `${userData.streetName}, ${userData.streetNumber} - ${userData.streetComplement}`
    );
  });

  it('should call on remove user data', () => {
    jest.spyOn(localStorageService, 'removeItem');
    jest.spyOn(router, 'navigate').mockReturnThis();

    component.onRemoveUserData();

    expect(localStorageService.removeItem).toHaveBeenCalledWith(StorageKey.USER_DATA);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
