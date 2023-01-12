import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';

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

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
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
}
