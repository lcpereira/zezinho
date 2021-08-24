import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Location } from '@shared/interfaces/location';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  addresses: google.maps.GeocoderResult[] | null = null;

  apiMapLoaded: Observable<boolean>;
  mapOptions: google.maps.MapOptions = {
    draggable: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    scrollwheel: false,
    clickableIcons: false,
    draggableCursor: 'initial',
    center: {
      lat: -23.55365,
      lng: -46.69279,
    },
  };

  constructor(
    httpClient: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    // TODO: loading e identificar quando não carregou o mapa
    this.apiMapLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAzNYxiTkC4fx0xcr3Joc42rDGF48Bnlzw',
        'callback'
      )
      .pipe(
        map(() => {
          // TODO: Fim do loading
          return true;
        }),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {}

  onLocation(location: Location): void {
    this.localStorageService.setItem(StorageKey.LOCATION, location);
    this.router.navigate(['products']);
  }
}
