import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { PdbDialogComponent } from './components/pdb-dialog/pdb-dialog.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataService } from './services/data.service';

import { NgxMatRangeSliderModule } from '../ngx-mat-range-slider/ngx-mat-range-slider.module';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [DashboardPageComponent, PdbDialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    NgxMatRangeSliderModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  providers: [
    DataService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DashboardModule {}
