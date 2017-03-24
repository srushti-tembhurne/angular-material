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
      a_id: {
        title: 'ID'
      },
       b_vmName: {
        title: 'VM Name',
        editable: false
      },
      c_cores: {
        title: 'CPU'
      },
      
      d_memory: {
        title: 'Memory'
      },
      e_storage: {
        title: 'Storage'
      },
      f_os: {
        title: 'Operting System'
      },
      g_status:{
        title:'Status'
      }
     
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true
     
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
            for (var j = 0; j < paramArray[props].length; j++) {
              let prop_name=String.fromCharCode(98+j)+"_"+paramArray[props][j].name;
              tempObj[prop_name] = paramArray[props][j].value;
            }
            tempObj["a_id"] = i + 1;
            tempObj[String.fromCharCode(98+j)+"_"+"status"]=DataArray[i].status;
            this.Requestdata.push(tempObj);
          }
          this.data = new LocalDataSource();
          this.data.load(this.Requestdata);
          

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

}


