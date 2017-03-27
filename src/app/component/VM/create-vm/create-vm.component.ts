import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { CommonService } from '../../../service/common.service';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

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
            os: ['', Validators.required],
            storage: ['', Validators.required],
            cores: ['', Validators.required],
            memory: ['', Validators.required],

        });
    }
    showDialog(msg) {
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: {
                message: "Request " + msg
            }
        });
        dialogRef.afterClosed().subscribe(result=>{
            this.CS.router.navigateByUrl('home/requests');
        });
    }
    onSubmit() {
        let model = this.vmcreationForm.value;
        this.formdata = { name: model.Name, description: model.description, type: model.type, operation: model.operation, parameters: [{ name: "vmName", value: model.vmName, type: "STRING" }, { name: "cores", value: model.cores, type: "NUMBER" }, { name: "memory", value: model.memory, type: "NUMBER" }, { name: "storage", value: model.storage, type: "NUMBER" }, { name: "os", value: model.os, type: "STRING" }] }
        this.CS.postService('/api/v1/request', this.formdata).subscribe(
            data => {
                let str = new String(data.message);
                this.Res = data;
                if (this.Res.status) {
                    this.showDialog(this.Res.data.status);
                    this.vmcreationForm.reset();
                    this.CS.removeStorage("createvm");
                }
            },
            err => {
                let res = JSON.parse(err._body);
                if (!res.status) {
                    console.log(err);
                    this.showDialog("" + err.status + " " + res.message + " ");
                }

            },
            () => { console.log("err"); });
    }
    backToHome() {
        this.CS.removeStorage("createvm");
        this.router.navigateByUrl('home/requests');
    }
    ngOnInit() {
        //this.CS.isLoggedIn();       
        this.setFormData();

    }
    onlyNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    setFormData() {
        let tempObj = {};
        tempObj = this.CS.recievData();
        let finalObj;
        if (tempObj) {
            let invt = {};
            for (let props in tempObj["parameters"]) {
                let temp = tempObj["parameters"][props];
                invt[temp["name"]] = temp["value"];
            }
            let tto = {
                Name: tempObj["name"] || tempObj["Name"],
                description: tempObj["description"],
                type: tempObj["type"],
                operation: tempObj["operation"]
            }
            finalObj = Object.assign(tto, invt);
            this.vmcreationForm.setValue(finalObj);
            this.CS.setStorage("createvm", JSON.stringify(finalObj));

        } else if (JSON.parse(this.CS.getStorage('createvm'))) {
            finalObj = JSON.parse(this.CS.getStorage('createvm'));
            this.vmcreationForm.setValue(finalObj);
            this.CS.setStorage("createvm", JSON.stringify(finalObj));
        }

    }

}


