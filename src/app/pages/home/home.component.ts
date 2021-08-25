import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserData } from '@shared/interfaces/user-data';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Router } from '@angular/router';
import { DistributorsQuery } from '@graphql/distributors.query';
import { Distributor, DistributorsRequest } from '@shared/interfaces/distributor';

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
    private distributorsQuery: DistributorsQuery,
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

  onUserData(userData: UserData): void {
    // TODO: mostrar loading...
    const variables: DistributorsRequest = {
      algorithm: 'NEAREST',
      lat: String(userData.latitude),
      long: String(userData.longitude),
      now: new Date().toISOString(),
    };

    this.distributorsQuery
      .watch(variables)
      .valueChanges.pipe(map((result) => result.data.pocSearch))
      .subscribe((distributors) => {
        if (!distributors || !distributors.length) {
          // TODO: disparar notificação
          return;
        }

        this.saveUserData(distributors[0], userData);
      });
  }

  private saveUserData(distributor: Distributor, userData: UserData): void {
    userData.id = distributor.id;

    this.localStorageService.setItem(StorageKey.USER_DATA, userData);
    this.router.navigate(['products']);
  }
}
