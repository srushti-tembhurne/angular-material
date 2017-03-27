import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import 'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    details: any;
    result: any;
    visible: string;
    InVisible: boolean = true;
    userDetails: any;
    userAgent: any;
    constructor(
        private _fb: FormBuilder,
        private CS: CommonService,
        private router: Router) {
        this.userAgent = this.CS.getBrowserInfo();
        this.loginForm = this._fb.group({
            userId: '',
            password: '',
            userAgent: [this.userAgent, [Validators.required]]
        });       
        //this.CS.isLoggedIn();

    }

    onlogin() {
        this.CS.postService('/api/v1/login', this.loginForm.value).subscribe(
            data => { this.loginResult(data); },
            err => {
                console.log(err);
                this.loginResult(err);
            },
            () => { });
    }
    loginResult(data) {      
        if (data.status) {
            let storage = window.sessionStorage;
            storage.setItem('token', data["data"].token);
            storage.setItem('expiry_in', (new Date(data["data"].expiry * 1000).toLocaleString()));
            storage.setItem('username', this.loginForm.value["userId"]);
            this.CS.setUserName(this.loginForm.value["userId"]);
            this.CS.token=data["data"].token;
            this.router.navigateByUrl('/home');
        } else {
            this.result = data.msg;
            this.InVisible = false;
        }

    }
    ngOnInit() { }


}
