import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { UserGroupsService } from './user-groups.service';

@UntilDestroy()
@Component({
  selector: 'vex-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class UserGroupsComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('boxed');

  columns: any[] = [
    { label: 'ID', property: 'id', type: 'text', visible: true },
    { label: 'Group Title (Arabic)', property: 'normalizedName', type: 'text', visible: true },
    { label: 'Group Title (English)', property: 'groupTitle', type: 'text', visible: true },
    { label: 'Party Type', property: 'partyType', type: 'text', visible: false },
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


  constructor(private router: Router, private userGroupService: UserGroupsService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.getGroups();

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

  getGroups() {

    this.userGroupService.getAllGroups().subscribe(res => {
      if (res.statusCode == 401) {
        return;
      }

      console.log(res);
      this.dataSource.data = res;
    });
  }

  createGroup() {
    this.router.navigateByUrl('/add-group');
  }

  updateGroup(role) {

  }

  deleteGroup(role) {

  }
}