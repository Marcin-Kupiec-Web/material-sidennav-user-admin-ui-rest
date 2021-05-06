import { TestBed } from '@angular/core/testing';

import { CryptoAESService } from './crypto-aes.service';

describe('CryptoAESService', () => {
  let service: CryptoAESService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoAESService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
