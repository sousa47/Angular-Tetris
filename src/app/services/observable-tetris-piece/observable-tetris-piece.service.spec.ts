import { TestBed } from '@angular/core/testing';

import { ObservableTetrisPieceService } from './observable-tetris-piece.service';

describe('ObservableTetrisPieceService', () => {
  let service: ObservableTetrisPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableTetrisPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
