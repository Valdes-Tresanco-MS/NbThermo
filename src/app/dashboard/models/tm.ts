import { RangeType } from '../../ngx-mat-range-slider/ngx-mat-range-slider.component';

export interface Tm {
  nanoDSF: Number | RangeType;
  dsf: Number | RangeType;
  dsc: Number | RangeType;
  circularDichroism: Number | RangeType;
  refolding: Number | RangeType;
}
