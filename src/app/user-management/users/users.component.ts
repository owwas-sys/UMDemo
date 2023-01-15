import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { UserService } from './user.service';

@Component({
  selector: 'vex-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('boxed');

  columns: any[] = [
    { label: 'ID', property: 'id', type: 'text', visible: true },
    { label: 'User', property: 'fullName', type: 'text', visible: true },
    { label: 'UserName', property: 'userName', type: 'text', visible: true },
    { label: 'Mobile #', property: 'phoneNumber', type: 'text', visible: false },
    { label: 'Created By', property: 'createdBy', type: 'text', visible: true },
    { label: 'Created Date', property: 'createdAt', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new UntypedFormControl();

  // labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.getUsers();

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }


  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {

    this.userService.getAllUsers().subscribe(res => {
      if (res.statusCode == 401) {
        return;
      }

      console.log(res);
      this.dataSource.data = res;
    });
  }

  createUser() {
    this.router.navigateByUrl('/add-user');
  }

  updateUser(role) {

  }

  deleteUser(role) {

  }
}