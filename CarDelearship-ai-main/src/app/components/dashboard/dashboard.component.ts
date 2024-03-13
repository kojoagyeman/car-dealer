import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest, map } from 'rxjs';
import { StatisticService } from 'src/app/services/statistic.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  visitorsFilledPrecentage$!: Observable<number>;

  constructor(
    private router: Router,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.visitorsFilledPrecentage$ = combineLatest([
      this.statisticService.visitorsCount$,
      this.statisticService.formsFilledCount$,
    ]).pipe(
      untilDestroyed(this),
      map(([visitors, formsFilled]) => Number(((formsFilled / visitors) * 100).toFixed(1)))
    );
  }

  onNavigateToHome() {
    this.router.navigate(['/']);
  }
}
