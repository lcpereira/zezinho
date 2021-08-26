import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapGeocoder } from '@angular/google-maps';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { LoadingModule } from '../loading/loading.module';

import { AddressSearchComponent } from './address-search.component';

const getAddresses = (withRoute: boolean) => {
  return {
    status: google.maps.GeocoderStatus.OK,
    results: [
      {
        address_components: [
          {
            long_name: 'Street Fake',
            short_name: 'Street Fake',
            types: withRoute ? ['route'] : ['any'],
          },
        ],
        formatted_address: 'Street Fake, 123',
        geometry: {
          bounds: new google.maps.LatLngBounds(),
          location: new google.maps.LatLng(123, 456),
          location_type: google.maps.GeocoderLocationType.GEOMETRIC_CENTER,
          viewport: new google.maps.LatLngBounds(),
        },
        partial_match: false,
        place_id: 'fake',
        postcode_localities: [],
        types: [],
      },
    ],
  };
};

describe('AddressSearchComponent', () => {
  let component: AddressSearchComponent;
  let fixture: ComponentFixture<AddressSearchComponent>;
  let geocoder: MapGeocoder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressSearchComponent],
      imports: [LoadingModule, ToastrModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSearchComponent);
    geocoder = TestBed.inject(MapGeocoder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addresses with address value', (done) => {
    const addresses = getAddresses(true);

    jest.spyOn(geocoder, 'geocode').mockReturnValue(of(addresses));
    jest.spyOn(component.addresses, 'emit');

    component.onSearchByAddress('Fake Address');

    setTimeout(() => {
      expect(geocoder.geocode).toHaveBeenCalledWith({ address: 'Fake Address' });
      expect(component.addresses.emit).toHaveBeenCalledWith(addresses.results);
      done();
    }, 500);
  });

  it('should emit addresses with lat/lng value', (done) => {
    const addresses = getAddresses(true);

    jest.spyOn(geocoder, 'geocode').mockReturnValue(of(addresses));
    jest.spyOn(component.addresses, 'emit');

    component.onSearchByLatLng(123, 456);

    setTimeout(() => {
      expect(geocoder.geocode).toHaveBeenCalledWith({ location: { lat: 123, lng: 456 } });
      expect(component.addresses.emit).toHaveBeenCalledWith(addresses.results);
      done();
    }, 500);
  });
});
