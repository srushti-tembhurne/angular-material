import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource, ServerDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { MdDialog } from '@angular/material';
import { PopUpDialogComponent } from '../pop-up-dialog/pop-up-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {
  Requestdata: any;
  data: LocalDataSource;
  input: string = '<i class="material-icons pointer" (click)="onUserRowSelect()">info</i>';
  settings = {
    edit: {
      confirmSave: true
    },
    columns: {

      type: {
        title: 'Type'
      },
      operation: {
        title: 'Operation'
      },
      name: {
        title: 'Name'
      },
      description: {
        title: 'Description'
      },
      status: {
        title: 'Status'
      },
      createdOn: {
        title: 'Created On'
      },
      Info: {
        title: 'Info',
        type: 'html',
        valuePrepareFunction: (value) => { return this.DS.bypassSecurityTrustHtml(this.input) }
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
    mode: 'external',
    editor: {
      type: 'checkbox',
      config: {
        true: true,
        false: false
      }
    }
  };

  constructor(private CS: CommonService, public dialog: MdDialog, public DS: DomSanitizer, public element: ElementRef) {
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
          this.data = new LocalDataSource();
          this.data.load(DataArray);


        } else if (!status && (str.includes("Failed to authenticate token") || str.includes("no token found"))/*(str.indexOf("Failed to authenticate token")>-1||str.indexOf("no token found"))*/) {
          this.CS.onlogout();
        }

      },
      err => {
        console.log(err)
           if(err.status==401)
        {
          this.CS.showDialog(err);
        }else{
          this.CS.ShowErrorDialog(err);
        }
      },
      () => { });
  }
  ngOnInit() {
    //this.CS.isLoggedIn();
    this.getData();
  }
  onEdit(event) {
    this.CS.sendData(event.data);
    this.CS.router.navigateByUrl('home/create-vm');
  }
  addNewRequest() {
    this.CS.router.navigateByUrl('home/create-vm');
  }
  onUserRowSelect(event) {
    this.showPopup(event.data)
  }
  showPopup(data) {
    let dialogRef = this.dialog.open(PopUpDialogComponent, {
      data: {
        info: data
      }
    });
  }

}


