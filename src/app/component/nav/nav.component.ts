import { Component, OnInit, Input } from '@angular/core';

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
  constructor() {
    this.links = [
      { name: 'Home', path: '/home' },
      { name: 'Requests', path: 'requests' },
      { name: 'Resource', path: 'resource' },
      {
        name: 'VM', path: "create-vm", submenu: [
          { path: "create-vm", name: "Create" },
          { path: "Monitor", name: "Monitor" },
          { path: "list", name: "List" }
        ]
      },
      { name: 'About Us', path: 'about' },
      { name: 'Contact Us', path: 'create-vm' }

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
      console.log(window.innerWidth);
      console.log(sidenav.close)
      sidenav.close();
    }
  }
  ngOnInit() {
  }

}
