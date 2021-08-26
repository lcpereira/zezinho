import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressPanelComponent } from './address-panel.component';

describe('AddressPanelComponent', () => {
  let component: AddressPanelComponent;
  let fixture: ComponentFixture<AddressPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressPanelComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
