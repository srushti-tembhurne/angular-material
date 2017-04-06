import { Component, OnInit } from '@angular/core';
import { VMForms }  from './vm.forms';
import { FormService } from './form.services';
@Component({
    selector: 'app-create-vm',
    template: `<div>
                  <add-forms [vmForms]="vmForms"></add-forms>
               </div>`,
    styleUrls: ['./create-vm.component.scss']
})
export class CreateVmComponent implements OnInit{
    vmForms: VMForms[];
    constructor(private formService: FormService) { }
    ngOnInit() {
        this.vmForms = this.formService.getForms();
    }
}

