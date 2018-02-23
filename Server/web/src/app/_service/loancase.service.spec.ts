/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoancaseService } from './loancase.service';

describe('Service: Loancase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoancaseService]
    });
  });

  it('should ...', inject([LoancaseService], (service: LoancaseService) => {
    expect(service).toBeTruthy();
  }));
});