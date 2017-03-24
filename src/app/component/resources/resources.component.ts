import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(private CS:CommonService) { 
    this.CS.getService('/api/v1/requests/resources').subscribe(
      data=>{
        console.log(data);
      }
    );
  }

  ngOnInit() {
  }

}
