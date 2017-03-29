import { Component, OnInit,Inject} from '@angular/core';
import {MdDialogRef,MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(public dialogRef:MdDialogRef<ErrorDialogComponent>,@Inject(MD_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }

}
