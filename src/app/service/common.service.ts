import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { DialogComponent } from '../component/dialog/dialog.component';
import 'rxjs/Rx';
@Injectable()
export class CommonService {
  baseUrl: string = "";
  data: any;
  navFlag: boolean;
  userDetails: any;
  userName: string;
  token: string;
  // visible:boolean = true;
  constructor(private http: Http, public router: Router, private dialog: MdDialog) {
    this.navFlag = false;
  }
  setUserName(name) {
    this.userName = name;
  }
  getUserName() {
    if (!this.userName) {
      return this.userName = window.sessionStorage.getItem('username');
    } else {
      return this.userName;
    }
  }
  setToken(token) {
    this.token = token;
  }
  getToken() {
    if (!this.token) {
      return this.token = window.sessionStorage.getItem('token');
    } else {
      return this.token;
    }
  }
  postService(url: string, data: any) {
    if (url.indexOf('login') == -1) {
      let headers = new Headers();
      headers.append('x-access-token', this.getToken());
      headers.append('username', this.getUserName());
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.baseUrl + url, data, { headers: headers }).map((res: Response) => { return res.json(); });
    }
    return this.http.post(this.baseUrl + url, data).map((res: Response) => { return res.json(); });
  }
  getService(url) {
    let headers = new Headers();
    headers.append('x-access-token', this.getToken());
    headers.append('username', this.getUserName());
    return this.http.get(this.baseUrl + url, { headers: headers }).map((res: Response) => { return res.json(); });
  }
  deleteService(url: string) {
    let headers = new Headers();
    headers.append('x-access-token', this.getToken());
    headers.append('username', this.getUserName());
    return this.http.delete(this.baseUrl + url, { headers: headers }).map((res: Response) => { return res.json(); });
  }
  updateService(url: string, data: any) {
    let headers = new Headers();
    headers.append('x-access-token', this.getToken());
    headers.append('username', this.getUserName());
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUrl + url, data, { headers: headers }).map((res: Response) => { return res.json(); });
  }
  getBrowserInfo() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    return {
      'browserName': browserName,
      'fullVersion': fullVersion,
      'majorVersion': majorVersion,
      'appName': navigator.appName,
      'userAgent': navigator.userAgent
    }
  }

  //Not Included Yet 
  tokenExpiryCheck() {
    let expiry = new Date(window.sessionStorage.getItem('expiry_in'));

    if (expiry && this.compareDates(expiry)) {
      return false; //token is not expired
    }
    return true; // token has been expired 
  }
  compareDates(expiry: Date) {
    let created = new Date();
    if ((expiry.getFullYear() >= created.getFullYear()) && (expiry.getMonth() >= created.getMonth()) && (expiry.getDay() >= created.getDay())) {
      return true; //token is not expired
    }
    return false; // token has been expired
  }


  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
  //function used to send data from one component to anoher
  sendData(data: any) { this.data = data; }
  //function used to recieve data wich was sent by sendData method
  recievData() { return this.data; }
  //Method used to check the user is loggedin or not and redirect respectivley 
  isLoggedIn(): boolean {   
    const pathName: string = window.location.pathname;
    if (window.sessionStorage) {
      this.userDetails = window.sessionStorage.getItem('token');
    }
    if (this.userDetails == "undefined" || this.userDetails == null || this.userDetails == "") {
       this.router.navigate(["/login"]);
      return false;
    } else {          
      return true;
    }
  }
  onlogout() {
    /* this.deleteService('/api/v1/login').subscribe(
       data => {
         if (data.success) {
           let storage = window.sessionStorage;
           storage.setItem('token', '');
           storage.setItem('expiry_in', '');
           storage.setItem('username', '');
           return data;          
         }
 
       },
       err => { 
         if(!err.status){
           return err;
         }
        },
       () => { });*/
    this.deleteService('/api/v1/login').subscribe(
      data => {
        if (data.status) {
          let storage = window.sessionStorage;
          storage.setItem('token', '');
          storage.setItem('expiry_in', '');
          storage.setItem('username', '');
          this.router.navigateByUrl('/login');
        }

      },
      err => {
        let res = JSON.parse(err._body);
        if (!res.status) {
          let storage = window.sessionStorage;
          storage.setItem('token', '');
          storage.setItem('expiry_in', '');
          storage.setItem('username', '');
          this.showDialog("" + err.status + " " + res.message + " ");
        }
      },
      () => { });
  }
  showDialog(msg) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: msg
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/login');
    });
  }
  onCancel() {
    this.router.navigateByUrl('/');
  }

  setStorage(key, value) {
    this.removeStorage(key);
    window.sessionStorage.setItem(key, value);
  }
  getStorage(key) {
    return window.sessionStorage.getItem(key);
  }
  removeStorage(key) {
    window.sessionStorage.removeItem(key);
  }
}
