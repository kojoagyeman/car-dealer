import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartConfiguration } from 'chart.js';
import { combineLatest } from 'rxjs';
import { UsersDataService } from 'src/app/services/users-data.service';

@UntilDestroy()
@Component({
  selector: 'app-bar-chart-engine',
  templateUrl: './bar-chart-engine.component.html',
  styleUrls: ['./bar-chart-engine.component.scss'],
})
export class BarChartEngineComponent implements OnInit {
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Electric', 'Fule'],
    datasets: [],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(
    private usersDataService: UsersDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initMotorTypeBarChart();
  }

  private initMotorTypeBarChart() {
    combineLatest([
      this.usersDataService.getElectricMotorCount$(),
      this.usersDataService.getFuleMotorTypeCount$(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([electricMotorCount, fuleMotorTypeCount]) => {
        this.barChartData = {
          labels: ['Electric', 'Fule'],
          datasets: [
            {
              data: [electricMotorCount, fuleMotorTypeCount],
              label: 'Engine Type',
            },
          ],
        };
        this.cdr.markForCheck();
      });
  }
}
