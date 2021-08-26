import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSearchComponent } from './address-search.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [AddressSearchComponent],
  imports: [CommonModule, LoadingModule],
  exports: [AddressSearchComponent],
})
export class AddressSearchModule {}
