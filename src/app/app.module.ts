import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterModule } from '@shared/components/footer/footer.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HeaderModule, FooterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
