import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserData } from '@shared/interfaces/user-data';

@Component({
  selector: 'app-address-panel',
  templateUrl: './address-panel.component.html',
  styleUrls: ['./address-panel.component.scss'],
})
export class AddressPanelComponent {
  interceptedAddresses: google.maps.GeocoderResult[] | null = null;

  @Input()
  set addresses(addresses: google.maps.GeocoderResult[] | null) {
    this.interceptedAddresses = addresses;
    this.onBackStep();
  }

  @Output() userData = new EventEmitter<UserData>();

  submitted = false;
  isFirstStep = true;
  addressForm = this.createForm();
  currentAddress: google.maps.GeocoderResult | null = null;

  constructor(private fb: FormBuilder) {}

  get formControl(): {
    [key: string]: AbstractControl;
  } {
    return this.addressForm.controls;
  }

  onSelectAddress(address: google.maps.GeocoderResult): void {
    this.currentAddress = address;
    this.isFirstStep = false;

    const hasStreetName = this.getStreetName(address);
    this.addressForm.controls['streetName'].setValue(hasStreetName?.long_name || null);

    const hasStreetNumber = this.getStreetNumber(address);
    this.addressForm.controls['streetNumber'].setValue(hasStreetNumber?.long_name || null);
  }

  onBackStep(): void {
    this.isFirstStep = true;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.addressForm.valid || !this.currentAddress) {
      return;
    }

    const userData: UserData = {
      id: '0', // Id provisório para manter o campo obrigatório na interface
      streetName: this.addressForm.get('streetName')?.value,
      streetNumber: Number(this.addressForm.get('streetNumber')?.value),
      streetComplement: this.addressForm.get('streetComplement')?.value,
      latitude: this.currentAddress.geometry.location.lat(),
      longitude: this.currentAddress.geometry.location.lng(),
    };

    this.userData.emit(userData);
  }

  private getStreetName(
    address: google.maps.GeocoderResult
  ): google.maps.GeocoderAddressComponent | null {
    const streetName = address.address_components.find((address_component) => {
      return address_component.types.includes('route');
    });

    return streetName || null;
  }

  private getStreetNumber(
    address: google.maps.GeocoderResult
  ): google.maps.GeocoderAddressComponent | null {
    const streetNumber = address.address_components.find((address_component) => {
      const hasStreetNumber = address_component.types.includes('street_number');

      if (!hasStreetNumber) {
        return false;
      }

      const isNaN = Number.isNaN(Number(address_component.long_name));

      return !isNaN;
    });

    return streetNumber || null;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      streetName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      streetNumber: [null, [Validators.required]],
      streetComplement: [null],
    });
  }
}
