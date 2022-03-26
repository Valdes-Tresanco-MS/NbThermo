import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatRangeSliderComponent } from './ngx-mat-range-slider.component';

describe('NgxMatRangeSliderComponent', () => {
  let component: NgxMatRangeSliderComponent;
  let fixture: ComponentFixture<NgxMatRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
