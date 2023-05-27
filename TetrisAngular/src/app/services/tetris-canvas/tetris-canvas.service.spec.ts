import { TestBed } from '@angular/core/testing';

import { TetrisCanvasService } from './tetris-canvas.service';

describe('CanvasPiecesService', () => {
  let service: TetrisCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
