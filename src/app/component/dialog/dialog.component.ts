import { Component, OnInit } from '@angular/core';
import {Inject } from '@angular/core';
import { MdDialogRef,MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef:MdDialogRef<DialogComponent>,@Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
