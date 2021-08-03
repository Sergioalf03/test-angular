import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleFormComponent } from './vehicle-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [VehicleFormComponent]
})
export class VehicleFormModule { }
