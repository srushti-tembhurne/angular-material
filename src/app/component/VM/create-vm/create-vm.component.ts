import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { CommonService } from '../../../service/common.service';

@Component({
    selector: 'app-create-vm',
    templateUrl: './create-vm.component.html',
    styleUrls: ['./create-vm.component.scss']
})
export class CreateVmComponent implements OnInit {
    vmcreationForm: FormGroup;
    formdata: any;
    osList: any[];
    Res: any;
    cancelFlag: boolean = true;
    constructor(private _fb: FormBuilder, private router: Router, private CS: CommonService, private dialog: MdDialog) {
        this.osList = [{ name: 'Ubuntu 8', version: 'ubuntu-8.04-desktop-amd64.iso' },
        { name: 'Ubuntu 14', version: 'ubuntu-14.04.1-server-amd64.iso' },
        { name: 'CentOS 7', version: 'CentOS-7-x86_64-Minimal-1611.iso' },
        { name: 'Windows Server 64bit', version: '8250.0WIN8_X64_SERVER.ISO' }];
        this.vmcreationForm = this._fb.group({
            Name: ['', Validators.required],
            description: ['', Validators.required],
            type: ['VM', Validators.required],
            operation: ['CREATE', [Validators.required]],
            vmName: ['', Validators.required],
            OS: ['', Validators.required],
            diskSize: ['', Validators.required],
            cpuCore: ['', Validators.required],
            Memory: ['', Validators.required],

        });
    }
 showDialog(msg) {
       let dialogRef = this.dialog.open(DialogComponent, {           
            data: {
                message: "Request "+msg
            }
        });
    }
    onSubmit() {        
        let model = this.vmcreationForm.value;
        this.formdata = { name: model.Name, description: model.description, type: model.type, operation: model.operation, parameters: [{ name: "vmName", value: model.vmName, type: "STRING" }, { name: "cores", value: model.cpuCore, type: "NUMBER" }, { name: "memory", value: model.Memory, type: "NUMBER" }, { name: "storage", value: model.diskSize, type: "NUMBER" }, { name: "os", value: model.OS, type: "STRING" }] }
        this.CS.postService('/api/v1/request', this.formdata).subscribe(
            data => {
                let str = new String(data.message);
                this.Res = data;
                if (this.Res.status) {
                    this.showDialog(this.Res.data.status);
                    this.vmcreationForm.reset();
                } else if (str.indexOf("Failed to authenticate token") > -1) {
                    this.CS.onlogout();                    
                } else if (!this.Res.status) {
                    
                }                
            },
            err => {
                let res=JSON.parse(err._body);
                if (!res.status) {
                    console.log(err);
                    this.showDialog(""+err.status +" "+res.message+" ");
                }
                
            },
            () => { console.log("err"); });
    }
    redirectToHome() {      
        if (this.cancelFlag) {
            if (this.Res.result == "Request saved") {
                this.CS.onCancel();
            } else {
                console.log("Error in Form");
            }

        } else {
            this.CS.onlogout();
        }
    }
    backToHome() {
        this.router.navigateByUrl('/home');
    }
    ngOnInit() {
        this.CS.isLoggedIn();
    }
    onlyNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

   
}


