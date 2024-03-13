import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  map,
  take,
  tap,
} from 'rxjs';
import { UserData } from '../models/user-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private http: HttpClient) {}

  private readonly USERS_DATA_KEY = 'carDealershipAi-data';
  private _usersData$ = new BehaviorSubject<UserData[]>([]);

  getAll$() {
    return this._usersData$.asObservable();
  }

  getMaleUsers$(): Observable<UserData[]> {
    return this._usersData$.pipe(
      map((users) => users.filter((user) => user.gender === 'male'))
    );
  }

  getFemaleUsers$(): Observable<UserData[]> {
    return this._usersData$.pipe(
      map((users) => users.filter((user) => user.gender === 'female'))
    );
  }

  getFemailUsersCount$(): Observable<number> {
    return this._usersData$.pipe(
      map((users) => users.filter((user) => user.gender === 'female').length)
    );
  }

  getMaleUsersCount$(): Observable<number> {
    return this._usersData$.pipe(
      map((users) => users.filter((user) => user.gender === 'male').length)
    );
  }

  getElectricMotorCount$(): Observable<number> {
    return this._usersData$.pipe(
      map(
        (users) => users.filter((user) => user.motorType === 'electric').length
      )
    );
  }

  getFuleMotorTypeCount$(): Observable<number> {
    return this._usersData$.pipe(
      map((users) => users.filter((user) => user.motorType === 'fuel').length)
    );
  }

  getUsersAgeAndSeats$(): Observable<{ age: string; seats: number }[]> {
    return this._usersData$.pipe(
      map((users) => {
        return users
          .sort(
            (a, b) =>
              new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
          )
          .map((user) => {
            const age = this.getYearBirthDate(user.birthDate);
            const seats = user.seats;
            return { age, seats };
          });
      })
    );
  }

  private getYearBirthDate(birthDate: string): string {
    const date = new Date(birthDate);
    return `${date.getFullYear()}`;
  }

  initUsers(): void {
    const usersFromLocalStorage = localStorage.getItem(this.USERS_DATA_KEY);
    if (!usersFromLocalStorage) {
      this.http
        .get<UserData[]>('assets/mock-users.json')
        .pipe(
          take(1),
          tap(() => {
            console.log('All users loaded');
            console.log('saving users to local storage');
          }),
          catchError((error) => {
            console.error('Users loading failed ', error);
            return EMPTY;
          })
        )
        .subscribe((users) => {
          localStorage.setItem(this.USERS_DATA_KEY, JSON.stringify(users));
          this._usersData$.next(users);
        });
    } else {
      this._usersData$.next(
        JSON.parse(usersFromLocalStorage || '') as UserData[]
      );
    }
  }

  saveNewUser(user: UserData): void {
    const users: string | null = localStorage.getItem(this.USERS_DATA_KEY);
    const usersData: UserData[] = JSON.parse(users || '');

    if (usersData?.length) {
      usersData.push(user);
      localStorage.setItem(this.USERS_DATA_KEY, JSON.stringify(usersData));
      this._usersData$.next(usersData);
    }
  }
}
