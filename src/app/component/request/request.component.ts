import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource, ServerDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { MdDialog } from '@angular/material';
import { PopUpDialogComponent } from '../pop-up-dialog/pop-up-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { requestData } from './request-data';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {
  //data: LocalDataSource;
  data: any = requestData.data;
  settings: any;
  constructor(private CS: CommonService, public dialog: MdDialog, public DS: DomSanitizer, public element: ElementRef) {
    this.data = new LocalDataSource();
    this.settings = {
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
          title: 'Created On',
          sortDirection:'desc'
        },
        Actions: {
          title: 'Info',
          type: 'html',
          valuePrepareFunction: (value) => { return this.DS.bypassSecurityTrustHtml('<i appInfo class="material-icons pointer" >info</i>') },
          filter: false
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
    };
  }
  getData() {
    this.CS.getService('/api/v1/request').subscribe(
      data => {
        let DataArray: any;
        if (data.status) {
          DataArray = data.data; 
          this.data.load(DataArray);
        }
      },
      err => {
        console.log(err)
        if (err.status == 401) {
          this.CS.showDialog(err);
        } else {
          this.CS.ShowErrorDialog(err);
        }
      },
      () => { });
  }
  ngOnInit() {
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
    this.showPopup(event.data.parameters)
  }
  showPopup(data) {
    let dialogRef = this.dialog.open(PopUpDialogComponent, {
      data: {
        info: data
      }
    });
  }

}


