import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { AddressPanelModule } from '@shared/components/address-panel/address-panel.module';
import { AddressSearchModule } from '@shared/components/address-search/address-search.module';
import { LoadingModule } from '@shared/components/loading/loading.module';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AddressSearchModule,
        AddressPanelModule,
        LoadingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
