import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldPieceComponent } from './hold-piece.component';

describe('HoldPieceComponent', () => {
  let component: HoldPieceComponent;
  let fixture: ComponentFixture<HoldPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoldPieceComponent]
    });
    fixture = TestBed.createComponent(HoldPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
