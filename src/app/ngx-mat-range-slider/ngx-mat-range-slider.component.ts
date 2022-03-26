import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ThemePalette } from '@angular/material/core';

export interface RangeType {
  min: number;
  max: number;
}

@Component({
  selector: 'lib-ngx-mat-range-slider',
  templateUrl: './ngx-mat-range-slider.component.html',
  styleUrls: ['./ngx-mat-range-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxMatRangeSliderComponent implements OnInit {
  isMinValueInit = true;
  isMaxValueInit = true;
  thumbLabel = true;
  @Input() minValue: number = 0;
  @Input() maxValue: number = 100;
  @Input() minColor: ThemePalette = 'accent';
  @Input() maxColor: ThemePalette = 'primary';
  @Input() showRuler = false;

  @Input() formatLabel = (v: any) => v;

  @Output() output = new EventEmitter<RangeType>();

  maxConf = 75;

  @Input()
  set max(m: number) {
    this.maxConf = parseInt(m.toString(), 10);
  }
  get max(): number {
    return this.maxConf;
  }

  minConf = 18;

  @Input()
  set min(m: number) {
    this.minConf = parseInt(m.toString(), 10);
  }
  get min(): number {
    return this.minConf;
  }

  @Input()
  set value(v: { min: number; max: number }) {
    this.minValue = v.min;
    this.maxValue = v.max;
  }

  get rulerArray(): number[] {
    return [...Array(this.max - this.min).keys()].map((i) => i + this.min);
  }

  ngOnInit(): void {
    if (!this.minValue) {
      this.minValue = this.min;
    }
    if (!this.maxValue) {
      this.maxValue = this.max;
    }
    this.isMinValueInit = this.minValue === this.min;
    this.isMaxValueInit = this.maxValue === this.max;
    this.output.emit({ min: this.minValue, max: this.maxValue });
  }

  valueChange(): void {
    this.output.emit({ min: this.minValue, max: this.maxValue });
  }

  minValueInput(a: MatSliderChange): void {
    this.isMinValueInit = a.value === this.min;
    if ((a.value || 0) >= this.maxValue) {
      a.source.value = this.maxValue;
    }
  }

  maxValueInput(a: MatSliderChange): void {
    this.isMaxValueInit = a.value === this.max;
    if ((a.value || 0) <= this.minValue) {
      a.source.value = this.minValue;
    }
  }
}
