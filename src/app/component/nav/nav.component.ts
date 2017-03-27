import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() sidenav: any;
  links: any[];
  linkss: any[];
  shown: boolean;
  showNav: boolean;
  sideNav: boolean = true;
  User: string;
  constructor(private CS: CommonService) {
    this.links = [
     { name: 'Home', path: '/home', icon: 'home' },
      { name: 'Requests', path: 'requests',icon:'screen_share' },
      { name: 'Resource', path: 'resource', icon:/*'desktop_windows'*/'important_devices' },
      { name: 'About Us', path: 'about', icon:'group'},
      { name: 'Contact Us', path: 'create-vm', icon:'local_phone' }

    ];
    this.shown = true;
  }

  submenu(evt) {
    this.shown = !this.shown;
  }
  openList() {
    this.showNav = !this.showNav;
  }
  onResize(sidenav) {

    if (window.innerWidth == 840) {
      sidenav.close();
    }
  }
  ngOnInit() {
    this.User = this.CS.getUserName();
  }
  logout() {
   this.CS.onlogout();
  }

}

/** {
        name: 'VM', path: "create-vm", submenu: [
          { path: "create-vm", name: "Create" },
          { path: "Monitor", name: "Monitor" },
          { path: "list", name: "List" }
        ]
      },*/
