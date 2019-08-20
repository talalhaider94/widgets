import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DynamicModule } from 'ng-dynamic-component';
import { GridsterModule } from 'angular-gridster2';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { DoughnutChartComponent } from '../../widgets/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from '../../widgets/radar-chart/radar-chart.component';
import { BarchartComponent } from '../../widgets/barchart/barchart.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { PublicComponent } from './public/public.component';
import { DashboardListsComponent } from './dashboard-lists/dashboard-lists.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    GridsterModule,
    DynamicModule.withComponents([
      LineChartComponent,
      DoughnutChartComponent,
      RadarChartComponent,
      BarchartComponent
    ]),
    HighchartsChartModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [ 
    DashboardComponent,
    DoughnutChartComponent,
    LineChartComponent,
    RadarChartComponent,
    MenuComponent,
    BarchartComponent,
    PublicComponent,
    DashboardListsComponent
  ]
})
export class DashboardModule { }
