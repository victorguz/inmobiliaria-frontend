import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { FieldFormComponent } from './field-form/field-form.component';
import { MaterialModule } from './material.module';
import { DialogComponent } from './dialog/dialog.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

const DECLARATIONS = [
  SpinnerComponent,
  FieldFormComponent,
  DialogComponent,GenericTableComponent
];
const IMPORTS = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule,
];
@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...IMPORTS],
  exports: [...DECLARATIONS, ...IMPORTS],
})
export class SharedModule {}
