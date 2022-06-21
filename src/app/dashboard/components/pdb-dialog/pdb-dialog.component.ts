import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDBViewer } from '../../helpers/pdbHelper';

@Component({
  selector: 'app-pdb-dialog',
  templateUrl: './pdb-dialog.component.html',
  styleUrls: ['./pdb-dialog.component.scss'],
})
export class PdbDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    PDBViewer(this.data.pdb);
  }
}
