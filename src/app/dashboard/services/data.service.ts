import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RangeType } from 'ngx-mat-range-slider';

import getData from '../data/database.json';
import { Database } from '../models/database';
import { Nanobody } from '../models/nanobody';
import { Antigen } from '../models/antigen';
import { Origin } from '../models/origin';
import { mapData } from './data.mapper';

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

const isInstanceOfRangeType = (data: any) => {
  return 'min' in data && 'max' in data;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private database: Database = { data: [] };
  $data: BehaviorSubject<Nanobody[]> = new BehaviorSubject<Nanobody[]>([]);

  constructor() {}

  compare(item: any, filter: any, key = ''): boolean {
    if (!filter) {
      return false;
    } else if (isInstanceOfRangeType(filter)) {
      if (!!item) {
        return item >= filter.min && item <= filter.max;
      }

      return false;
    }

    return Object.keys(item).some((key) => {
      return this.compare(item[key], filter[key], key);
    });
  }

  filterData(filter: Subset<Nanobody>) {
    console.log(filter);
    console.log(this.database.data.length);
    const result = this.database.data.filter((item: Nanobody) =>
      this.compare(item, filter)
    );
    console.log(result);
    this.$data.next(result);
  }

  getAntigenKeys(key: keyof Antigen) {
    return [
      ...new Set(
        this.database.data.flatMap((item: Nanobody) =>
          item.binding.antigens.map((antigen: Antigen) => antigen[key])
        )
      ),
    ].sort((a, b) => (a > b ? 1 : -1)) as string[];
  }

  getOriginKeys(key: keyof Origin) {
    return [
      ...new Set(this.database.data.map((item: Nanobody) => item.origin[key])),
    ].sort((a, b) => (a > b ? 1 : -1)) as string[];
  }

  getData() {
    this.database = mapData(getData);
    this.$data.next(this.database.data);
  }
}
