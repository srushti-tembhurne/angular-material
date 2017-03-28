import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss']
})
export class PopUpDialogComponent implements OnInit {
  settings = {
    columns: {
      name: {
        title: "Name",
        filter:"disable"
      },
      value: {
        title: "Values",
        filter:"disable"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true
    },
     hideSubHeader:true,
     hideHeader:false
    
  };
  private parameters: any[];
  constructor(public dialogRef: MdDialogRef<PopUpDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    let parameter = [], localdata = [];
    localdata = this.data.info.parameters;
    for (let i = 0; i < localdata.length; i++) {
      parameter.push({
        "name": localdata[i].name,
        "value": localdata[i].value,
      });
    }
    this.parameters = parameter;
    console.log(parameter);

  }

  ngOnInit() {
  }

}
