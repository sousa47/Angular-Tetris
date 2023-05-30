import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPiecesComponent } from './next-pieces.component';

describe('NextPiecesComponent', () => {
  let component: NextPiecesComponent;
  let fixture: ComponentFixture<NextPiecesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextPiecesComponent]
    });
    fixture = TestBed.createComponent(NextPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
