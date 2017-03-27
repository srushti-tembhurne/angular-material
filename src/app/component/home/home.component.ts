import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CommonService } from '../../service/common.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class HomeComponent implements OnInit {
  User: string;
  height: number;
  constructor(private CS: CommonService, private router: Router, public dialog: MdDialog) {
    this.height = window.innerHeight;
  }
  onResize(event){
     this.height = window.innerHeight;
  }
  ngOnInit() {
    this.User = this.CS.getUserName();
  }
  logout() {
   this.CS.onlogout();
  }
  
}
