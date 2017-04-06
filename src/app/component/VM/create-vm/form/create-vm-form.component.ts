import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormComponent } from '../interface-form.component';
import { CommonService } from '../../../../service/common.service';
import { SuccessDialogComponent } from '../../../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
    templateUrl: './create-vm-form.component.html'
})
export class CreateVMFormComponent implements FormComponent {
    @Input() data: any;
    osList: any[];
    vmcreationForm: FormGroup;
    formdata: any;
    Res: any;

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
    ngOnInit() {
        console.log("Create Page on init this executes first");
    }
    showDialog(msg) {
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
            data: {
                message:  msg
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.CS.router.navigateByUrl('home/requests');
        });
    }
    showErrorDialog(msg) {
        let dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: {
                message:  msg
            }
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
                    this.showDialog(this.Res.data.status == "SAVED" ? "Request has been saved successfully." : this.Res.data.status);
                    this.vmcreationForm.reset();
                    this.CS.removeStorage("createvm");
                }
            },
            err => {
                let res = JSON.parse(err._body);
                if (!res.status) {
                    console.log(err);
                    this.showErrorDialog(" " + res.message + " ");
                }
            },
            () => { });
    }
    backToHome() {
        this.CS.removeStorage("createvm");
        this.router.navigateByUrl('home/requests');
    }
    onlyNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
}
