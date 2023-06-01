import { TestBed } from '@angular/core/testing';

import { NextPiecesService } from './next-pieces.service';

describe('NextPiecesService', () => {
  let service: NextPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
