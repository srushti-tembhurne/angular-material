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
        title: "Name"
        
      },
      value: {
        title: "Values"
       
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
    let parameter = [], localdata = [],additionalInfo={};
    additionalInfo=this.data.additionalInfo||"";
    localdata = this.data.info;
    for (let i = 0; i < localdata.length; i++) {
      let propName=localdata[i].name;
      if(propName =="storage"){
        propName=propName+" (GB)";
      }else if(propName =="memory")
      {
        propName=propName+" (MB)";
      }
      parameter.push({
        "name": propName.toUpperCase()  ,
        "value": localdata[i].value ||localdata[i].qty,
      });

    }
    if(additionalInfo && additionalInfo!=null)
    {
      for(let prop in additionalInfo)
      {
        parameter.push({"name":prop,"value":additionalInfo[prop]})  
      }
    }
    this.parameters = parameter;

  }

  ngOnInit() {
  }

}
