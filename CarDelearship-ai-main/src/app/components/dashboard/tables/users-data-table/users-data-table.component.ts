import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserData } from 'src/app/models/user-data.model';
import { UsersDataService } from 'src/app/services/users-data.service';

@UntilDestroy()
@Component({
  selector: 'app-users-data-table',
  templateUrl: './users-data-table.component.html',
  styleUrls: ['./users-data-table.component.scss'],
})
export class UsersDataTableComponent implements OnInit {
  displayedColumns: string[] = [];
  tableDataSource: UserData[] = [];

  constructor(
    private usersDataService: UsersDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initTableData();
  }

  initTableData() {
    this.usersDataService
      .getAll$()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.displayedColumns = Object.keys(data[0]);
        this.tableDataSource = data;
        this.cdr.markForCheck();
      });
  }
}
