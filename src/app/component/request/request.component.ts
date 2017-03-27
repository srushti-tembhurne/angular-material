import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource, ServerDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import {MdDialog} from '@angular/material';
import {PopUpDialogComponent} from '../pop-up-dialog/pop-up-dialog.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  Requestdata: any;
  data: LocalDataSource;
  settings = {
    edit: {
      confirmSave: true
    },
    columns: {     
      _id: {
        title: 'ID'
      },
      resourceId: {
        title: 'Resource Id',
        editable: false
      },
      jobId: {
        title: 'Job Id'
      },

      name: {
        title: 'Name'
      },
      description: {
        title: 'Description'
      },
      createdOn: {
        title: 'Created On'
      },
      operation: {
        title: 'Operation'
      },
      type: {
        title: 'Type'
      },
      status: {
        title: 'Status'
      }
    },
    actions: {
      add: false,
      edit: true,
      delete: false
    },
    pager: {
      display: true

    },
    mode:'external',
    editor: {
      type: 'checkbox',
      config: {
        true: true,
        false: false
      }
    }
  };

  constructor(private CS: CommonService,public dialog:MdDialog) {
  }
  getData() {
    this.CS.getService('/api/v1/request').subscribe(
      data => {
        let str = new String(data.msg);
        let success: boolean = data.success;
        let DataArray: any;
        let paramArray = {};
        let final = [];

        if (data.status) {
          this.Requestdata = [];
          DataArray = data.data;
          console.log(DataArray);
          /*for (let i = 0; i < DataArray.length - 1; i++) {
            let props = "parameter_" + i;
            paramArray[props] = DataArray[i].parameters;
            let tempObj = {};
            for (var j = 0; j < paramArray[props].length; j++) {
              let prop_name=String.fromCharCode(98+j)+"_"+paramArray[props][j].name;
              tempObj[prop_name] = paramArray[props][j].value;
            }
            tempObj["a_id"] = i + 1;
            tempObj[String.fromCharCode(98+j)+"_"+"status"]=DataArray[i].status;
            this.Requestdata.push(tempObj);
          }*/
          this.data = new LocalDataSource();
          this.data.load(DataArray);


        } else if (!status && (str.includes("Failed to authenticate token") || str.includes("no token found"))/*(str.indexOf("Failed to authenticate token")>-1||str.indexOf("no token found"))*/) {
          this.CS.onlogout();
        }

      },
      err => { console.log(err) },
      () => { });
  }
  ngOnInit() {
    //this.CS.isLoggedIn();
    this.getData();
  }
  onEdit(event){
    this.CS.sendData(event.data);
    this.CS.router.navigateByUrl('home/create-vm');
  }
  addNewRequest(){
    this.CS.router.navigateByUrl('home/create-vm');
  }
  onUserRowSelect(event)
  {   
    this.showPopup(event.data)
  }
  showPopup(data)
  {
    let dialogRef=this.dialog.open(PopUpDialogComponent,{
      data:{
        info:data
      }
    });
  }

}


