import { Injectable }           from '@angular/core';
import { CreateVMFormComponent }   from './form/create-vm-form.component';
import { EditVMFormComponent } from './form/edit-vm-form.component';
import { VMForms }               from './vm.forms';

@Injectable()
export class FormService {

  getForms() {
    return [
      new VMForms(CreateVMFormComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
      new VMForms(EditVMFormComponent, null),
    ];
  }
}