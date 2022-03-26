import { RangeType } from 'ngx-mat-range-slider';

export interface Tm {
  nanoDSF: Number | RangeType;
  dsf: Number | RangeType;
  dsc: Number | RangeType;
  circularDichroism: Number | RangeType;
  refolding: Number | RangeType;
}
