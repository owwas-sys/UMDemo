import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserGroupsRoutingModule } from './add-user-groups-routing.module';
import { AddUserGroupsComponent } from './add-user-groups.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { SecondaryToolbarModule } from '../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [AddUserGroupsComponent],
    imports: [
        CommonModule,
        AddUserGroupsRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSliderModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatExpansionModule,
        SecondaryToolbarModule,
        BreadcrumbsModule,
        MatTableModule,
        MatPaginatorModule,
        PageLayoutModule,
        MatMenuModule
    ]
})
export class AddUserGroupsModule {
}
