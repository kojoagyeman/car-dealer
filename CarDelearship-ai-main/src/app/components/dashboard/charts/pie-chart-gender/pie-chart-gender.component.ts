import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartDataset, ChartOptions } from 'chart.js';
import { combineLatest } from 'rxjs';
import { UsersDataService } from 'src/app/services/users-data.service';

@UntilDestroy()
@Component({
  selector: 'app-pie-chart-gender',
  templateUrl: './pie-chart-gender.component.html',
  styleUrls: ['./pie-chart-gender.component.scss'],
})
export class PieChartGenderComponent implements OnInit {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets: ChartDataset<'pie'>[] = [];

  constructor(
    private usersDataService: UsersDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initGenderPieChart();
  }

  private initGenderPieChart() {
    combineLatest([
      this.usersDataService.getMaleUsersCount$(),
      this.usersDataService.getFemailUsersCount$(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([maleCount, femailCount]) => {
        this.pieChartLabels = ['Male', 'Female'];
        this.pieChartDatasets = [
          {
            data: [maleCount, femailCount],
            label: 'Genders Pie',
          },
        ];
        this.cdr.markForCheck();
      });
  }
}
