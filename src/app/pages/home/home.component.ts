import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserData } from '@shared/interfaces/user-data';
import { LocalStorageService } from '@services/local-storage.service';
import { StorageKey } from '@shared/enums/storage-key.enum';
import { Router } from '@angular/router';
import { DistributorsQuery } from '@graphql/distributors.query';
import { Distributor, DistributorsRequest } from '@shared/interfaces/distributor';
import { LoadingService } from '@shared/components/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  addresses: google.maps.GeocoderResult[] | null = null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private distributorsQuery: DistributorsQuery,
    private localStorageService: LocalStorageService
  ) {}

  onUserData(userData: UserData): void {
    this.loadingService.open();

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
        this.loadingService.close();

        if (!distributors || !distributors.length) {
          this.toastr.warning('Não encontramos distribuidor neste endereço', '', {
            positionClass: 'toast-top-center',
          });
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
