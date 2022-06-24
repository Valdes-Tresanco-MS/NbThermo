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
import { MatDialog } from '@angular/material/dialog';
import { PdbDialogComponent } from '../pdb-dialog/pdb-dialog.component';

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

  @ViewChild('antigenTypeInput')
  antigenTypeInput!: ElementRef<HTMLInputElement>;

  @ViewChild('sourceInput')
  sourceInput!: ElementRef<HTMLInputElement>;

  @ViewChild('originTypeInput')
  originTypeInput!: ElementRef<HTMLInputElement>;

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
  originTypeControl = new FormControl();
  obtainingMethodControl = new FormControl();

  selectedAntigens: string[] = [];
  selectedAntigenTypes: string[] = [];
  selectedSources: string[] = [];
  selectedSequences: string[] = [];
  selectedOriginTypes: string[] = [];
  selectedObtainingMethods: string[] = [];
  selectedTm: any;
  selectedYield: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tmOptions: any = [
    { name: 'nanoDSF', value: 'nanoDSF' },
    { name: 'DSF', value: 'dsf' },
    { name: 'DSC', value: 'dsc' },
    { name: 'Circular dichroism', value: 'circularDichroism' },
    { name: 'Refolding', value: 'refolding' },
    { name: 'Other', value: 'other' },
  ];

  yieldOptions: any = [
    { name: 'Periplasm', value: 'periplasm' },
    { name: 'Cytoplasm', value: 'cytoplasm' },
    { name: 'Other', value: 'other' },
  ];

  $data!: Observable<Nanobody[]>;
  data: Nanobody[] = [];

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.$data = this.dataService.$data;
    this.dataService.getData();
    this.antigenNames = this.dataService.getAntigenKeys('name');
    this.antigenTypes = this.dataService.getAntigenKeys('type');
    this.sources = this.dataService.getOriginKeys('source');
    this.originTypes = this.dataService.getOriginKeys('type');
    this.obtainingMethods = this.dataService.getOriginKeys('method');
  }

  buildChart(nanobody: any) {
    const nativeElement = this.chartElement.nativeElement;
    const { refolding, ...data } = nanobody.tm;

    this.svgElement = Histogram(
      this.dataService.getTempratures(),
      nativeElement.clientWidth,
      data
    );
  }

  buildFilter() {
    this.filterObject = {
      ...this.filterObject,

      ...(this.selectedAntigens.length > 0 ||
      this.selectedAntigenTypes.length > 0
        ? {
            binding: {
              antigens: [
                ...this.selectedAntigens.map((i) => ({
                  name: i,
                })),
                ...this.selectedAntigenTypes.map((i) => ({
                  type: i,
                })),
              ],
            },
          }
        : { binding: undefined }),

      ...(this.selectedSources.length > 0 ||
      this.selectedOriginTypes.length > 0 ||
      this.selectedObtainingMethods.length > 0
        ? {
            origin: [
              ...this.selectedSources.map((i) => ({
                source: i,
              })),
              ...this.selectedOriginTypes.map((i) => ({
                type: i,
              })),
              ...this.selectedObtainingMethods.map((i) => ({
                method: i,
              })),
            ],
          }
        : { origin: undefined }),
      ...(this.selectedSequences.length > 0
        ? {
            sequence: {
              raw: [...this.selectedSequences.map((i) => i)],
            },
          }
        : { sequence: undefined }),
    };
  }

  // combineObjects([head: any, ...[headTail, ...tailTail]]): any {
  //   if (!headTail) return head;

  //   const combined: any = headTail.reduce((acc, x) => {
  //     return acc.concat(head.map((h: any) => ({ ...h, ...x })));
  //   }, []);

  //   return this.combineObjects([combined, ...tailTail]);
  // }

  filter(filter: Subset<Nanobody>) {
    this.dataService.filterData(filter);
  }

  onChangeRange(range: RangeType, key: string, parent: keyof Nanobody) {
    this.filterObject = {
      ...this.filterObject,
      [parent]: {
        [key]: range,
      },
    };
    this.filter(this.filterObject);
  }

  openDialog(nanobody: any) {
    this.loading = true;
    const fileName = nanobody.structure.pdb.split(',')[0];
    this.dataService
      .getPDB(`/assets/${fileName.toLowerCase()}.pdb`)
      .subscribe((pdb) => {
        this.loading = false;
        const dialogRef = this.dialog.open(PdbDialogComponent, {
          data: { pdb },
        });
      });
  }

  removeOption(option: string, target: string[]): void {
    const index = target.indexOf(option);

    if (index >= 0) {
      target.splice(index, 1);
    }

    this.buildFilter();
    this.filter(this.filterObject);
  }

  selectOption(
    option: string,
    target: string[],
    control: FormControl,
    input: any
  ) {
    if (!!option) {
      target.push(option);
      control.setValue(null);
      input.value = '';
      input.blur();

      this.buildFilter();
      this.filter(this.filterObject);
    }
  }
}
