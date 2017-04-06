import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import 'hammerjs';
import 'chart.js';

import { ROUTING } from './app.route'
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CreateVmComponent } from './component/VM/create-vm/create-vm.component';
import { AboutComponent } from './component/about/about.component';
import { CommonService } from './service/common.service';
import { NavComponent } from './component/nav/nav.component'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RequestComponent } from './component/request/request.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { ConstructionComponent } from './component/construction/construction.component';
import { SuccessDialogComponent } from './component/success-dialog/success-dialog.component';
import { PopUpDialogComponent } from './component/pop-up-dialog/pop-up-dialog.component';
import { AuthgaurdService } from './service/authgaurd.service';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
import { InfoDirective } from './shared/info.directive';

import { VMOperationFormComponent } from './component/VM/create-vm/vmoperation-form.component';
import { CreateVMFormComponent } from './component/VM/create-vm/form/create-vm-form.component';
import { EditVMFormComponent } from './component/VM/create-vm/form/edit-vm-form.component';
import { FormDirective } from './component/VM/create-vm/form.directive';
import { FormService } from './component/VM/create-vm/form.services';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateVmComponent,
    AboutComponent,
    NavComponent,
    DashboardComponent,
    RequestComponent,
    ResourcesComponent,
    DialogComponent,
    InventoryComponent,
    ConstructionComponent,
    SuccessDialogComponent,
    PopUpDialogComponent,
    ErrorDialogComponent,
    InfoDirective,VMOperationFormComponent,
    CreateVMFormComponent,
    EditVMFormComponent,
    FormDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ROUTING,
    ReactiveFormsModule,
    ChartsModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    DialogComponent, SuccessDialogComponent, PopUpDialogComponent,ErrorDialogComponent,CreateVMFormComponent,EditVMFormComponent
  ],
  providers: [CommonService,AuthgaurdService,FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
