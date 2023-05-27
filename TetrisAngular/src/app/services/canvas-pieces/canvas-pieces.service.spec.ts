import { TestBed } from '@angular/core/testing';

import { CanvasPiecesService } from './canvas-pieces.service';

describe('CanvasPiecesService', () => {
  let service: CanvasPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
