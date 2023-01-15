import { TestBed } from '@angular/core/testing';

import { FormElementsService } from './form-elements.service';

describe('FormElementsService', () => {
  let service: FormElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
