//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileSaverModule } from 'ngx-filesaver';
import { TreeviewModule } from 'ngx-treeview';
import { TokenInterceptorService, ErrorInterceptorService } from '../app/_helpers';

//import { FilterUsersPipe } from './_pipes/filterUsers.pipe';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgetComponent } from './views/forget/forget.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './_pipes/safe.pipe';
// import { FilterUsersPipe } from './_pipes/filterUsers.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { LoadingFormComponent } from './views/loading-form/loading-form.component';
// import { CommingsoonComponent } from './components/commingsoon/commingsoon.component';

@NgModule({
  imports: [
    //BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FileSaverModule,
    SweetAlert2Module.forRoot(),
    TreeviewModule.forRoot() 
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    SafePipe,
   // FilterUsersPipe
    // LoadingFormComponent,
    // CommingsoonComponent
  ],
  exports: [/*FilterUsersPipe*/],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    {
    provide: LocationStrategy, 
    useClass: HashLocationStrategy // commenting this and location strategry hides the # from url. need to see sideeffect.
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
