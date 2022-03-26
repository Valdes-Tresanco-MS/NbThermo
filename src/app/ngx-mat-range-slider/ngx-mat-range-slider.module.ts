import { NgModule } from '@angular/core';
import { NgxMatRangeSliderComponent } from './ngx-mat-range-slider.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [NgxMatRangeSliderComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [NgxMatRangeSliderComponent]
})
export class NgxMatRangeSliderModule { }
