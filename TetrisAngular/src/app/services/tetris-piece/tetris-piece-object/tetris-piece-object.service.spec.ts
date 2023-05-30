import { TestBed } from '@angular/core/testing';

import { TetrisPieceObjectService } from './tetris-piece-object.service';

describe('TetrisPieceService', () => {
  let service: TetrisPieceObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisPieceObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
