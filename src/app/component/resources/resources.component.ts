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
      _id: {
        title: "Id",
        editable: false
      },
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
      createdAt:{
        title:"Created At"
      },
      status: {
        title: "Status",
        editable: false
      } 

    },
    actions: {
      add: false,
      edit: false,
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
        this.data.load(data.data);
      }
    );
  }
onUserRowSelect(event)
{
  console.log(event.data)
}

  ngOnInit() {
  }
 

}
  