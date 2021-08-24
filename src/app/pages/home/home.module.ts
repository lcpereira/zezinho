import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { SearchModule } from '@shared/components/search/search.module';
import { AddressPanelModule } from '@shared/components/address-panel/address-panel.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SearchModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HomeRoutingModule,
    GoogleMapsModule,
    AddressPanelModule,
  ],
})
export class HomeModule {}
