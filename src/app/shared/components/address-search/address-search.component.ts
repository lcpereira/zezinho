import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
})
export class AddressSearchComponent implements OnInit, OnDestroy {
  @Output() addresses = new EventEmitter<google.maps.GeocoderResult[] | null>();

  geocoderDebouncer = new Subject<google.maps.GeocoderRequest>();

  private subscriptions = new Subscription();

  constructor(private geocoder: MapGeocoder) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.geocoderDebouncer
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe((data: google.maps.GeocoderRequest) => {
          this.searchGeocoder(data);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchByAddress(address: string): void {
    this.geocoderDebouncer.next({ address });
  }

  onSearchByLatLng(lat: number, lng: number): void {
    this.geocoderDebouncer.next({ location: { lat, lng } });
  }

  getCurrentPosition(): void {
    // TODO: Adicionar um loading...
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.onSearchByLatLng(position.coords.latitude, position.coords.longitude);
        },
        (error: GeolocationPositionError) => {
          if (error.PERMISSION_DENIED) {
            alert('A captura pela localização não foi permitida');
          } else {
            alert('Não foi possível capturar sua localização');
          }
        }
      );
    } else {
      alert('O Serviço de geolocalização não é suportado pelo seu navegador.');
    }
  }

  private searchGeocoder(data: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(data).subscribe((data: MapGeocoderResponse) => {
      if (data.results) {
        data.results = this.clearAddresses(data.results);
      }

      this.addresses.emit(data.results);
    });
  }

  private clearAddresses(addresses: google.maps.GeocoderResult[]): google.maps.GeocoderResult[] {
    return addresses.reduce(
      (addressesClean: google.maps.GeocoderResult[], address: google.maps.GeocoderResult) => {
        const isStreet = address.address_components.find((address_component) =>
          address_component.types.includes('route')
        );

        if (isStreet) {
          const hasAddress = addressesClean.find(
            (addressClean) => addressClean.formatted_address === address.formatted_address
          );

          if (!hasAddress) {
            addressesClean.push(address);
          }
        }

        return addressesClean;
      },
      []
    );
  }
}
