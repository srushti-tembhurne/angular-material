import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource, ServerDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';

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
      cores: {
        title: 'CPU'
      },
      id: {
        title: 'ID'
      },
      memory: {
        title: 'Memory'
      },
      os: {
        title: 'Operting System'
      },
      storage: {
        title: 'Storage'
      },
      vmName: {
        title: 'VM Name',
        editable: false
      }
    },
    actions: {
      add: false,
      edit: true,
      delete: false
    },
    pager: {
      display: true,
      perPage: 5
    }
  };

  constructor(private CS: CommonService) {
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
          for (let i = 0; i < DataArray.length - 1; i++) {
            let props = "parameter_" + i;
            paramArray[props] = DataArray[i].parameters;
            let tempObj = {};
            for (let j = 0; j < paramArray[props].length; j++) {
              tempObj[paramArray[props][j].name] = paramArray[props][j].value;
            }
            tempObj["id"] = i + 1;
            this.Requestdata.push(tempObj);
          }
          console.log(this.Requestdata);
          this.data = new LocalDataSource();
          this.data.load(this.Requestdata);
          //this.data.setPaging(1,7);

        } else if (!status && (str.includes("Failed to authenticate token") || str.includes("no token found"))/*(str.indexOf("Failed to authenticate token")>-1||str.indexOf("no token found"))*/) {
          this.CS.onlogout();
        }

      },
      err => { console.log(err) },
      () => { });
  }
  ngOnInit() {
    this.CS.isLoggedIn();
    this.getData();
  }
  onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {
      console.log(event.newDate);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}


