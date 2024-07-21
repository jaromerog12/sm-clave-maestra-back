import { TestBed } from '@angular/core/testing';

import { ClaveMaestraService } from './clave-maestra.service';

describe('ClaveMaestraService', () => {
  let service: ClaveMaestraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaveMaestraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
