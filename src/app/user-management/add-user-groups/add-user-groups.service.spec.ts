import { TestBed } from '@angular/core/testing';

import { AddUserGroupsService } from './add-user-groups.service';

describe('FormElementsService', () => {
  let service: AddUserGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUserGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
