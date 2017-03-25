import { HomeComponent } from './component/home/home.component';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { LoginComponent } from './component/login/login.component';
import { CreateVmComponent } from './component/VM/create-vm/create-vm.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RequestComponent } from './component/request/request.component'
import { ResourcesComponent } from './component/resources/resources.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { ConstructionComponent } from './component/construction/construction.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, children: [
            { path: '', component: DashboardComponent, pathMatch: 'full' },
            { path: 'about', component: AboutComponent },
            { path: 'create-vm', component: CreateVmComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'requests', component: RequestComponent },
            { path: 'resource', component: ResourcesComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: '**', component: ConstructionComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ConstructionComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
//export const routComponents=[HomeComponent,AboutComponent,LoginComponent,CreateVmComponent];