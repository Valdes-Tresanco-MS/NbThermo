import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataService } from '../../services/data.service';
import { Nanobody } from '../../models/nanobody';
import { RangeType } from '../../../ngx-mat-range-slider/ngx-mat-range-slider.component';
import { Histogram } from '../../helpers/histogram';
import { CdkVirtualForOf } from '@angular/cdk/scrolling';

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr];
};

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('antigenNameInput')
  antigenNameInput!: ElementRef<HTMLInputElement>;

  @ViewChild('chart')
  chartElement!: ElementRef<HTMLDivElement>;
  svgElement: any;

  filterObject: any = {};

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

  buildChart(nanobody: Nanobody) {
    const nativeElement = this.chartElement.nativeElement;
    this.svgElement = Histogram(
      this.dataService.getTempratures(),
      nativeElement.clientWidth,
      nanobody.tm
    );
    this.renderer.appendChild(nativeElement, this.svgElement);
  }

  onChangeRange(range: RangeType, key: string, parent: keyof Nanobody) {
    this.filterObject = {
      ...this.filterObject,
      [parent]: {
        ...(this.filterObject[parent] as any),
        [key]: range,
      },
    };
    this._filter(this.filterObject);
  }

  onChangeBindingRange(range: RangeType, key: string) {
    this.filterObject = {
      ...this.filterObject,
      binding: {
        ...this.filterObject.binding,
        antigens: [{ [key]: range }],
      },
    };
    this._filter(this.filterObject);
  }

  private _filter(filter: Subset<Nanobody>) {
    this.dataService.filterData(filter);
  }

  addChip(event: MatChipInputEvent, target: string[]): void {
    console.log(event);
    const value = (event.value || '').trim();
    if (value) {
      target.push(value);
    }
    //event.chipInput!.clear();
  }

  selectAntigen(antigen: string) {
    this.selectedAntigens.push(antigen);
    this.antigenNameControl.setValue(null);
    this.antigenNameInput.nativeElement.value = '';
    this.antigenNameInput.nativeElement.blur();

    const {
      binding,
      binding: { antigens },
    } = this.filterObject;

    this.filterObject = {
      ...this.filterObject,
      binding: {
        ...binding,
        antigens: [...antigens, { name: antigen }],
      },
    };
    this._filter(this.filterObject);
  }

  removeAntigen(antigen: string): void {
    const index = this.selectedAntigens.indexOf(antigen);

    if (index >= 0) {
      this.selectedAntigens.splice(index, 1);
    }
  }
}
