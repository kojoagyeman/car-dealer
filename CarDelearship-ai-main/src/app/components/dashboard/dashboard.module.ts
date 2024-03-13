import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { PieChartGenderComponent } from './charts/pie-chart-gender/pie-chart-gender.component';
import { LineChartSeatsComponent } from './charts/line-chart-seats/line-chart-seats.component';
import { BarChartEngineComponent } from './charts/bar-chart-engine/bar-chart-engine.component';
import { UsersDataTableComponent } from './tables/users-data-table/users-data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardComponent,
    PieChartGenderComponent,
    LineChartSeatsComponent,
    BarChartEngineComponent,
    UsersDataTableComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class DashboardModule {}
