import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPanelComponent } from './address-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddressPanelComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressPanelComponent],
})
export class AddressPanelModule {}
