import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  settings = {
    columns: {
      a_vmId: {
        title: "VM Id",
        editable: false
      },
      b_vmNode: {
        title: "VM Node",
        editable: false
      },
      c_userId: {
        title: "User Id",
        editable: false
      },
      d_name: {
        title: "Name",
        editable: false
      },
      e_type: {
        title: "Type",
        editable: false
      },
      f_cpu: {
        title: "CPU"
      },
      g_memory: {
        title: "Memory"
      },
      h_storage: {
        title: "Storage"
      },
      i_status: {
        title: "Status",
        editable: false
      },

    },
    actions: {
      add: false,
      edit: true,
      delete: false
    },
    pager: {
      display: true

    }, edit: {
      confirmSave: true
    }
  };
  data: LocalDataSource;
  invt = {};
  constructor(private CS: CommonService) {
    this.CS.getService('/api/v1/requests/resources').subscribe(
      data => {
        this.data = new LocalDataSource();
        this.data.load(this.setResourceData(data));

      }
    );
  }
  setResourceData(data) {
    let rawData = data.data;
    let final = [];
    for (let prop in rawData) {
      let raw = this.getProperties(rawData[prop]);
      let f_raw = {};
      for (let prop in raw) {
        switch (prop) {
          case "vmId":
            f_raw["a_vmId"] = raw[prop];
            break;
          case "vmNode":
            f_raw["b_vmNode"] = raw[prop];
            break;
          case "userId":
            f_raw["c_userId"] = raw[prop];
            break;
          case "name":
            f_raw["d_name"] = raw[prop];
            break;
          case "type":
            f_raw["e_type"] = raw[prop];
            break;
          case "cpu":
            f_raw["f_cpu"] = raw[prop];
            break;
          case "memory":
            f_raw["g_memory"] = raw[prop];
            break;
          case "storage":
            f_raw["h_storage"] = raw[prop];
            break;
          case "status":
            f_raw["i_status"] = raw[prop];
            break;
        }
      }
      final.push(f_raw);
    }
    return final;

  }
  getProperties(obj) {
    let allowValue = ["name", "type", "userId", "vmId", "vmNode", "status", "cpu", "memory", "storage"];

    for (let prop in obj) {

      if (typeof obj[prop] == 'object') {
        if (prop == "inventory_items") {
          for (let props in obj[prop]) {
            let temp = obj[prop][props];
            this.invt[temp["name"]] = temp["qty"];
          }
        } else {
          this.getProperties(obj[prop]);
        }

      } else {
        if (allowValue.indexOf(prop) > -1) {
          this.invt[prop] = obj[prop];
        }

      }

    }

    return this.invt;
  }

  ngOnInit() {
  }
  onSaveConfirm(event): void {
    if (window.confirm('Are you sure you want to save?')) {
      console.log(event.newData);
      let vm = event.newData;
      let data = {
        "name": vm.d_name,
        "type": vm.e_type,
        "description": "Edit Operation",
        "operation": "UPDATE",
        "parameters": [
          {
            "name": "vm_Id",
            "value": vm.a_vmId,
            "type": "NUMBER"
          },
          {
            "name": "vm_node",
            "value": vm.b_vmNode,
            "type": "STRING"
          },
          {
            "name": "cores",
            "value": vm.f_cpu,
            "type": "NUMBER"
          },
          {
            "name": "memory",
            "value": vm.g_memory,
            "type": "NUMBER"
          },
          {
            "name": "storage",
            "value": vm.h_storage,
            "type": "NUMBER"
          }

        ]
      }
      console.log(data);
      this.CS.postService('/api/v1/request', data).subscribe(
        data => {
          console.log(data);
          event.confirm.resolve(event.newData);
        },
        err => {
          event.confirm.reject();
        }
      );

    } else {
      event.confirm.reject();
    }
  }

}
