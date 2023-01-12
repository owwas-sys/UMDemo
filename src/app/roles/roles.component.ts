import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { RoleService } from './role.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';

@UntilDestroy()
@Component({
  selector: 'vex-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
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
export class RolesComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('boxed');

  columns: any[] = [
    { label: 'ID', property: 'id', type: 'text', visible: true },
    { label: 'Role Title (Arabic)', property: 'normalizedName', type: 'text', visible: true },
    { label: 'Role Title (English)', property: 'name', type: 'text', visible: true },
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


  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource();
    this.getRoles();

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

  getRoles() {

    this.roleService.getAllRoles().subscribe(res => {
      if (res.statusCode == 401) {
        return;
      }

      console.log(res);
      this.dataSource.data = res;
    });
  }

  createRole() {
    this.router.navigateByUrl('/add-role');
  }

  updateRole(role) {

  }

  deleteRole(role) {

  }
}
