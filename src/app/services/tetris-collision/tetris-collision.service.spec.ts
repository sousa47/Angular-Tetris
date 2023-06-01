import { TestBed } from '@angular/core/testing';

import { TetrisCollisionService } from './tetris-collision.service';

describe('TetrisCollisionService', () => {
  let service: TetrisCollisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetrisCollisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
