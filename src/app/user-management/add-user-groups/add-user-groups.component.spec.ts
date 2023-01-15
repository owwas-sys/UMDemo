import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddUserGroupsComponent } from './add-user-groups.component';

describe('FormElementsComponent', () => {
  let component: AddUserGroupsComponent;
  let fixture: ComponentFixture<AddUserGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserGroupsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
