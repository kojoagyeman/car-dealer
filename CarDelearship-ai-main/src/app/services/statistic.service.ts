import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private readonly VISITORS_COUNT_KEY = 'carDealershipAi-visitors-count';
  private readonly FORMS_FILLED_COUNT_KEY = 'carDealershipAi-formsFilled-count';
  private _visitors$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _formsFilled$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private formFilled = false;

  get visitorsCount$() {
    return this._visitors$.asObservable();
  }

  get formsFilledCount$() {
    return this._formsFilled$.asObservable();
  }

  constructor() {}

  init() {
    this.initVisitorsCount();
    this.initFormsFilledCount();
  }

  private initVisitorsCount(): void {
    const visitorsCount = localStorage.getItem(this.VISITORS_COUNT_KEY);
    if (!visitorsCount) {
      this._visitors$.next(0);
    } else {
      this._visitors$.next(Number(visitorsCount));
    }
  }

  private initFormsFilledCount(): void {
    const formsFilledCount = localStorage.getItem(this.FORMS_FILLED_COUNT_KEY);
    if (!formsFilledCount) {
      this._formsFilled$.next(0);
    } else {
      this._formsFilled$.next(Number(formsFilledCount));
    }
  }

  appendVisitors() {
    this._visitors$.next(this._visitors$.value + 1);
    localStorage.setItem(
      this.VISITORS_COUNT_KEY,
      this._visitors$.value.toString()
    );
  }

  appendFormsFilled() {
    if (!this.formFilled) {
      this.formFilled = true;
      this._formsFilled$.next(this._formsFilled$.value + 1);
      localStorage.setItem(
        this.FORMS_FILLED_COUNT_KEY,
        this._formsFilled$.value.toString()
      );
    }
  }

  getPercentFormsFilled(): number {
    const totalVisitors = this._visitors$.value;
    const formsFilled = this._formsFilled$.value;

    return (formsFilled / totalVisitors) * 100;
  }
}
