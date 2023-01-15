import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/core/http/api.service';
import { RoleService } from '@app/roles/role.service';
import { ApiType } from '@app/shared/enums/enums';
import { map, startWith } from 'rxjs/operators';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import { FormElementsService } from './form-elements.service';

export interface PartyType {
  name: string;
}

export interface Party {
  name: string;
}

@Component({
  selector: 'vex-form-elements',
  templateUrl: './form-elements.component.html',
  styleUrls: ['./form-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class FormElementsComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(private router: Router, private fb: UntypedFormBuilder, private cd: ChangeDetectorRef,
    private apiService: ApiService, private roleService: FormElementsService) { }

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



  ngOnInit() {
    this.form = this.fb.group({
      RoleNameAr: [''],
      RoleName: ['']
    });
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

  addRole() {
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    const roleFormValue = this.form.value;
    this.roleService.addRole(this.form.value).subscribe(res => {
      if (res.statusCode == 401) {
        return;
      }

      this.router.navigateByUrl('custom-layout/roles');
    });
    // }
  }
}
