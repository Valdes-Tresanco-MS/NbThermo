import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatDrawerContent } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataService } from '../../services/data.service';
import { Nanobody } from '../../models/nanobody';
import { RangeType } from '../../../ngx-mat-range-slider/ngx-mat-range-slider.component';

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  filterObject: Subset<Nanobody> = {};

  antigenNames: string[] = [];
  antigenTypes: string[] = [];
  originTypes: string[] = [];
  obtainingMethods: string[] = [];
  sequencies: string[] = [];
  sources: string[] = [];
  loading: boolean = false;

  antigenNameControl = new FormControl();
  antigenTypeControl = new FormControl();
  sequenceControl = new FormControl();
  sourceControl = new FormControl();
  typeControl = new FormControl();
  obtainingMethodControl = new FormControl();

  selectedAntigens: string[] = [];
  selectedAntigenTypes: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  panelOpenState = false;
  $data!: Observable<Nanobody[]>;
  data: Nanobody[] = [];

  constructor(private dataService: DataService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.$data = this.dataService.$data;
    this.dataService.getData();
    this.antigenNames = this.dataService.getAntigenKeys('name');
    this.antigenTypes = this.dataService.getAntigenKeys('type');
    this.sources = this.dataService.getOriginKeys('source');
    this.originTypes = this.dataService.getOriginKeys('type');
    this.obtainingMethods = this.dataService.getOriginKeys('method');
  }

  onChangeTmRange(range: RangeType, key: string) {
    const { tm } = this.filterObject;
    this.filterObject = {
      ...this.filterObject,
      tm: {
        ...tm,
        [key]: range,
      },
    };
    this._filter(this.filterObject);
  }

  private _filter(filter: Subset<Nanobody>) {
    this.dataService.filterData(filter);
  }

  addAntigen(event: MatChipInputEvent): void {
    console.log(event);
    // const value = (event.value || '').trim();
    // if (value) {
    //   this.selectedAntigens.push(value);
    // }
    // event.chipInput!.clear();
  }
}
