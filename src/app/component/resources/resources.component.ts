import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { PopUpDialogComponent } from '../pop-up-dialog/pop-up-dialog.component';
import { resourceData } from './resources-data';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  data: LocalDataSource;
  invt = {};
  input: string = '<i class="material-icons pointer" (click)="onUserRowSelect()">info</i>';
  settings = {
    columns: {
      type: {
        title: "Type",
        editable: false
      },
      name: {
        title: "Name",
        editable: false
      },
      userId: {
        title: "User Id",
        editable: false
      },
      createdAt: {
        title: "Created At",
        sortDirection: 'desc'
      },
      status: {
        title: "Status",
        editable: false
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
      display: true,
      perPage: 10

    }, edit: {
      confirmSave: true
    }
  };
  constructor(private CS: CommonService, public dialog: MdDialog, public DS: DomSanitizer, public element: ElementRef) {
    this.data = new LocalDataSource();
  }

  getResourceList() {
    this.CS.getService('/api/v1/requests/resources').subscribe(
      data => {
        this.data.load(data.data);
      },
      err => {
        if (err.status == 401) {
          this.CS.showDialog(err);
        } else {
          this.CS.ShowErrorDialog(err);
        }

      }
    );
  }
  ngOnInit() {
    this.getResourceList();
  }
  onUserRowSelect(event) {
    let data = event.data;
    this.showPopup(data.inventory_items, data.additionalInfo)
  }
  showPopup(data, additionalInfo) {
    let dialogRef = this.dialog.open(PopUpDialogComponent, {
      data: {
        info: data,
        additionalInfo: additionalInfo
      }
    });
  }

}
