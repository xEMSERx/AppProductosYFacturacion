import { TestBed } from '@angular/core/testing';

import { BcraExchangeService } from './bcra-exchange.service';

describe('BcraExchangeService', () => {
  let service: BcraExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BcraExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
