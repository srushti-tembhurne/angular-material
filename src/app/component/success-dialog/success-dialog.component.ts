import { Component, OnInit } from '@angular/core';
import {Inject } from '@angular/core';
import { MdDialogRef,MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  constructor(public dialogRef:MdDialogRef<SuccessDialogComponent>,@Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
