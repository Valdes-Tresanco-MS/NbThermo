import { RangeType } from '../../ngx-mat-range-slider/ngx-mat-range-slider.component';

export interface Antigen {
  name: string | string[];
  type: string | string[];
  affinity: Number | RangeType;
  notes: string | string[];
}
