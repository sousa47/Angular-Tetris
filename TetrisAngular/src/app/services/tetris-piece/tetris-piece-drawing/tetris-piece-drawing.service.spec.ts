import { TestBed } from '@angular/core/testing';

import { TetrisPieceDrawingService } from './tetris-piece-drawing.service';

describe('TetrisPieceService', () => {
  let service: TetrisPieceDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisPieceDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
