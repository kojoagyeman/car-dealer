import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersDataService } from 'src/app/services/users-data.service';
import { UserData } from 'src/app/models/user-data.model';
import { Subject } from 'rxjs';
import { StatisticService } from 'src/app/services/statistic.service';

interface Hobby {
  name: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  hobbies: Hobby[] = [];
  formSubmitted$: Subject<boolean> = new Subject<boolean>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('male', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    hobbies: new FormControl([], Validators.required),
    color: new FormControl('#000000'),
    seats: new FormControl(2, Validators.min(2)),
    motorType: new FormControl('electric'),
  });

  constructor(
    private usersDataService: UsersDataService,
    private statisticService: StatisticService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.usersDataService.saveNewUser(this.form.value as UserData);
      this.statisticService.appendFormsFilled();
      this.resetForm();
    }
  }

  addHobby(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.hobbies.push({ name: value });
    }
    event.chipInput!.clear();
  }

  removeHobby(fruit: Hobby): void {
    const index = this.hobbies.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  editHobby(fruit: Hobby, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeHobby(fruit);
      return;
    }

    const index = this.hobbies.indexOf(fruit);
    if (index >= 0) {
      this.hobbies[index].name = value;
    }
  }

  private resetForm() {
    this.hobbies = [];
    this.form.reset();
    this.formSubmitted$.next(true);
  }

  onFillAnotherForm() {
    this.formSubmitted$.next(false);
  }
}
