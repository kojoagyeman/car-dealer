import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { UsersDataService } from 'src/app/services/users-data.service';

@UntilDestroy()
@Component({
  selector: 'app-line-chart-seats',
  templateUrl: './line-chart-seats.component.html',
  styleUrls: ['./line-chart-seats.component.scss'],
})
export class LineChartSeatsComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ([] = []),
    datasets: ([] = []),
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };

  constructor(
    private usersDataService: UsersDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initAgeAndNumSeatsLineChart();
  }

  private initAgeAndNumSeatsLineChart() {
    this.usersDataService
      .getUsersAgeAndSeats$()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.lineChartData.labels = data.map((d) => d.age);
        this.lineChartData.datasets = [
          {
            data: data.map((d) => d.seats),
            label: 'Seats Count By Age',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
        ];
        this.cdr.markForCheck();
      });
  }
}
