import { TestBed } from '@angular/core/testing';

import { BlockchainserviceService } from './blockchainservice.service';

describe('BlockchainserviceService', () => {
  let service: BlockchainserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
