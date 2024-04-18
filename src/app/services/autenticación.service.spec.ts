import { TestBed } from '@angular/core/testing';

import { AutenticaciónService } from './autenticación.service';

describe('AutenticaciónService', () => {
  let service: AutenticaciónService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticaciónService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
