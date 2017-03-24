import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
//import { Ng2TableModule } from 'ng2-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//import {NgxDatatableModule} from '@swimlane/ngx-datatable';
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
    DialogComponent
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
    DialogComponent 
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
