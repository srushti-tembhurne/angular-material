import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, ComponentRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { CommonService } from '../../../service/common.service';
import { SuccessDialogComponent } from '../../success-dialog/success-dialog.component';

import { VMForms } from './vm.forms';
import { FormDirective } from './form.directive';
import { FormComponent } from './interface-form.component';
@Component({
    selector: 'add-forms',
    templateUrl: './create-vm.component.html',
    styleUrls: ['./create-vm.component.scss']
})
export class VMOperationFormComponent implements AfterViewInit, OnDestroy{
    @Input() vmForms: VMForms[];
    currentFormIndex: number = -1;
    @ViewChild(FormDirective) formHost: FormDirective;

    operationList: any[];
    vmcreationForm: FormGroup;
    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _fb: FormBuilder) { 
        this.operationList = [{ name: 'Create', value: 'CREATE' },
        { name: 'Edit', value: 'UPDATE' }];
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
    ngAfterContentInit() {
        this.loadComponent(0);
    }
    ngAfterViewInit() {
        // For Now Nothing to do here 
    }

    ngOnDestroy() {
        // For Now Nothing to do here 
    }

    loadComponent(_index){
        let index = _index;
        //this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
        this.currentFormIndex = index;
        let adItem = this.vmForms[this.currentFormIndex];
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(adItem.component);
        let viewContainerRef = this.formHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<FormComponent>componentRef.instance).data = adItem.data;
    }
    
    onOperationChange(event) {
        let selectedOperation = event
        switch (selectedOperation) {
            case "CREATE":
                this.loadComponent(0);
                break;
            case "UPDATE":
                this.loadComponent(1);
                break;
            default:
                console.log("Throw Error");
                break;
        }
    }
}
