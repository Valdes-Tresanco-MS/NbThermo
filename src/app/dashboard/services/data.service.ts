import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RangeType } from '../../ngx-mat-range-slider/ngx-mat-range-slider.component';

import getData from '../data/database.json';
import { Database } from '../models/database';
import { Nanobody } from '../models/nanobody';
import { Antigen } from '../models/antigen';
import { Origin } from '../models/origin';
import { Tm } from '../models/tm';
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

  constructor(private http: HttpClient) {}

  compare(item: any, filter: any, key = ''): boolean {
    if (!filter) {
      return true;
    } else if (Array.isArray(item)) {
      return this.compareItemArray(item, filter, key);
    } else if (typeof filter === 'string') {
      return item === filter;
    } else if (isInstanceOfRangeType(filter)) {
      return this.compareRange(item, filter);
    } else if (Array.isArray(filter)) {
      return filter.some((innerFilter: any) =>
        this.compare(item, innerFilter, key)
      );
    } else if (!!item && typeof item === 'object') {
      return Object.keys(item).every((innerkey) => {
        return this.compare(item[innerkey], filter[innerkey], innerkey);
      });
    } else {
      return false;
    }
  }

  compareItemArray(item: any, filter: any, key: any) {
    return item.length > 0
      ? item.every((innerItem: any) => {
          return Array.isArray(filter)
            ? filter.some((innerFilter: any) =>
                this.compare(innerItem, innerFilter, key)
              )
            : this.compare(innerItem, filter, key);
        })
      : false;
  }

  compareRange(item: any, filter: any) {
    if (filter.min === 0 && filter.max === 100) {
      return true;
    } else if (!!item) {
      return item >= (filter.min || 0) && item <= (filter.max || 100);
    }
    return false;
  }

  filterData(filter: Subset<Nanobody>) {
    console.log(filter);
    console.log(this.database.data.length);
    const result = this.database.data.filter((item: Nanobody) =>
      this.compare(item, filter)
    );
    console.log(result.length);
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

  getPDB(file: string) {
    return this.http.get(file, {
      headers: { 'Content-type': 'application/x-pdb' },
      responseType: 'text',
    });
  }

  getTempratures() {
    return this.database.data
      .flatMap((item: Nanobody) => {
        return Object.keys(item.tm).map((k) => item.tm[k as keyof Tm]);
      })
      .filter((i) => i);
  }
}
