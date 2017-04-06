import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormComponent } from '../interface-form.component';
import { CommonService } from '../../../../service/common.service';
import { SuccessDialogComponent } from '../../../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../error-dialog/error-dialog.component';

@Component({
  templateUrl: './edit-vm-form.component.html'
})
export class EditVMFormComponent implements FormComponent {
  @Input() data: any;
  vmeditForm: FormGroup;
  formdata: any;
  Res: any;
  vmList: any;
  selectedVM: any;
  previousDiskSize: string;
  storageErr: AbstractControl;
  vm: any;
  constructor(private _fb: FormBuilder, private router: Router, private CS: CommonService, private dialog: MdDialog) {
    this.vmeditForm = this._fb.group({
      Name: ['', Validators.required],
      description: ['', Validators.required],
      vmName: ['', Validators.required],
      storage: ['', Validators.compose([Validators.required, this.checkNaN])],
      cores: ['', Validators.required],
      memory: ['', Validators.required],
      /*storage_inc: ['', Validators.required]*/
    });
    this.storageErr = this.vmeditForm.controls["storage"];
  }
  checkNaN(fieldControl: FormControl) {
    return !isNaN(fieldControl.value) ? null : { notA: true }
  }
  ngOnInit() {
    this.getData();
  }


  getData() {
    this.CS.getService('/api/v1/requests/resources/edit').subscribe(
      data => {
        let str = new String(data.msg);
        let success: boolean = data.success;
        let DataArray: any;
        let paramArray = {};
        let final = [];

        if (data.status) {
          this.vmList = data.data;
        } else if (!status && (str.includes("Failed to authenticate token") || str.includes("no token found"))) {
          this.CS.onlogout();
        }
      },
      err => { console.log(err) },
      () => { });
  }

  onVMChange(event) {
    this.selectedVM = event
    this.CS.getService('/api/v1/requests/resources/' + this.selectedVM.value).subscribe(
      data => {
        if (data.status) {
          let invt = {};
          let finalObj;
          let tempObj = {};
          tempObj = data.data;
          for (let props in tempObj["inventory_items"]) {
            let temp = tempObj["inventory_items"][props];
            let prop_name = temp["name"] == "cpu" ? "cores" : temp["name"];
            invt[prop_name] = temp["qty"].toString();
          }
          let tto = {
            Name: "",
            description: "",
            vmName: this.selectedVM.value
          }
          finalObj = Object.assign(tto, invt);
          this.vmeditForm.setValue(finalObj);
        }
      },
      err => { console.log(err) },
      () => { });

  }

  onSubmit() {
    let model = this.vmeditForm.value;
    let currentVM = {};
    for (let prop in this.vmList) {
      let vm = this.vmList[prop]
      if (vm.requestId == this.selectedVM.value) {
        currentVM = vm;
      }
    }
    this.formdata = {
      name: model.Name,
      description: model.description,
      type: 'VM',
      operation: 'UPDATE',
      parameters: [
        {
          name: "vmName",
          value: currentVM["vmName"],
          type: "STRING"
        },
        {
          name: "resourceId",
          value: currentVM["requestId"],
          type: "STRING"
        },
        {
          name: "vm_Id",
          value: currentVM["vmId"],
          type: "NUMBER"
        },
        {
          name: "cores",
          value: model.cores,
          type: "NUMBER"
        },
        {
          name: "memory",
          value: model.memory,
          type: "NUMBER"
        }, {
          name: "storage",
          value: model.storage/*diskSize*/,
          type: "NUMBER"
        }
        , {
          name: "vm_node",
          value: currentVM["vmNode"],
          type: "STRING"
        }
      ]
    }
    this.CS.postService('/api/v1/request', this.formdata).subscribe(
      data => {
        let str = new String(data.message);
        this.Res = data;
        if (this.Res.status) {
          this.showDialog(this.Res.data.status);
          this.vmeditForm.reset();
        }
      },
      err => {
        let res = JSON.parse(err._body);
        if (!res.status) {
          console.log(err);
          this.showErrorDialog(" " + res.message + " ");
        }

      });
  }
  backToHome() {
    this.CS.removeStorage("createvm");
    this.router.navigateByUrl('home/requests');
  }

  showDialog(msg) {
    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        message: " " + msg
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

  onlyNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;    
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
