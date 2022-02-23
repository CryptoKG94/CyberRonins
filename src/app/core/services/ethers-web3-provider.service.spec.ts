import { TestBed } from '@angular/core/testing';

import { EthersWeb3ProviderService } from './ethers-web3-provider.service';

describe('EthersWeb3ProviderService', () => {
  let service: EthersWeb3ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersWeb3ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
