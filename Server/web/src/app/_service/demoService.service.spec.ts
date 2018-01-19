/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DemoServiceService } from './demoService.service';

describe('Service: DemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoServiceService]
    });
  });

  it('should ...', inject([DemoServiceService], (service: DemoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
