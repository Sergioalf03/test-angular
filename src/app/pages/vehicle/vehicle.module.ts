import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'form',
    component: VehicleComponent,
  },
  {
    path: 'form/:id',
    component: VehicleComponent,
  },
  {
    path: '',
    loadChildren: () => import('./vehicle-list/vehicle-list.module').then(m => m.VehicleListModule),
  },
];

@NgModule({
  declarations: [
    VehicleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class VehicleModule { }
