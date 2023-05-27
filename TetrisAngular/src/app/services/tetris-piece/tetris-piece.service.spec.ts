import { TestBed } from '@angular/core/testing';

import { TetrisPieceService } from './tetris-piece.service';

describe('TetrisPieceService', () => {
  let service: TetrisPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
