import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';
import { RoleService } from '@app/roles/role.service';
import { ApiType } from '@app/shared/enums/enums';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { map, startWith } from 'rxjs/operators';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../@vex/animations/stagger.animation';
import { AddUserGroupsService } from './add-user-groups.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export interface PartyType {
  name: string;
}

export interface Party {
  name: string;
}

@UntilDestroy()
@Component({
  selector: 'vex-form-elements',
  templateUrl: './add-user-groups.component.html',
  styleUrls: ['./add-user-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
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
export class AddUserGroupsComponent implements OnInit {

  form: UntypedFormGroup;

  columns: any[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Role Name', property: 'normalizedName', type: 'text', visible: true },
    { label: 'Services Include', property: 'name', type: 'text', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new UntypedFormControl();

  // labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  

  selectCtrl: UntypedFormControl = new UntypedFormControl();
  inputType = 'password';
  visible = false;

  partyTypeCtrl = new UntypedFormControl();
  partytypes: PartyType[] = [
    {
      name: 'Bus Companies'
    },
    {
      name: 'Car Syndicate'
    },
    {
      name: 'Establishment Service Group'
    },
    {
      name: 'Haj Establishment'
    },
    {
      name: 'MOH Field Agent'
    }
  ];
  filteredpartyTypes$ = this.partyTypeCtrl.valueChanges.pipe(
    startWith(''),
    map(partyType => partyType ? this.filterpartyTypes(partyType) : this.partytypes.slice())
  );

  partyCtrl = new UntypedFormControl();
  parties: Party[] = [
    {
      name: 'IT'
    },
    {
      name: 'HR'
    },
    {
      name: 'Finance'
    },
    {
      name: 'Admin'
    }
  ];
  filteredparties$ = this.partyCtrl.valueChanges.pipe(
    startWith(''),
    map(party => party ? this.filterparties(party) : this.parties.slice())
  );
  panelOpenState = false;

  constructor(private router: Router, private fb: UntypedFormBuilder, private cd: ChangeDetectorRef,
    private apiService: ApiService, private addUserGroupService: AddUserGroupsService, private roleService: RoleService) { }

  ngOnInit() {
    this.form = this.fb.group({
      RoleNameAr: [''],
      RoleName: ['']
    });
    this.dataSource = new MatTableDataSource();
    this.getRoles();

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  filterpartyTypes(name: string) {
    return this.partytypes.filter(state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterparties(name: string) {
    return this.parties.filter(state => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
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

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
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
    this.router.navigateByUrl('custom-layout/add-role');
  }

  updateRole(role) {

  }

  deleteRole(role) {

  }
}
