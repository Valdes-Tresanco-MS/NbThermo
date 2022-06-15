import { RangeType } from '../../ngx-mat-range-slider/ngx-mat-range-slider.component';

export interface Antigen {
  name: string;
  type: string;
  affinity: Number | RangeType;
  notes: string;
}
