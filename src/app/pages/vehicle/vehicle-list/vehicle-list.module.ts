import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormModule } from 'src/app/components/vehicle-form/vehicle-form.module';

const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
  },
];

@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VehicleFormModule,
  ]
})
export class VehicleListModule { }
