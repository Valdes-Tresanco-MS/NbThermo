import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbDialogComponent } from './pdb-dialog.component';

describe('PdbDialogComponent', () => {
  let component: PdbDialogComponent;
  let fixture: ComponentFixture<PdbDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdbDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
