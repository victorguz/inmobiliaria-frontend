import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const PROVIDERS = [MatDatepickerModule];
const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatSelectModule,
  MatExpansionModule,
  MatMenuModule,
  MatSlideToggle,
  MatBadgeModule,
  MatGridListModule,
  MatNativeDateModule,
  MatToolbarModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [PROVIDERS],
})
export class MaterialModule {}
