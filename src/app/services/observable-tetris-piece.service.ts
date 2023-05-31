import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TetrisPiece } from '../models/pieces/tetris-piece';

@Injectable({
  providedIn: 'root',
})
export class ObservableTetrisPieceService {
  public readonly currentTetrisPieceSubject = new Subject<TetrisPiece | null>();
  private currentTetrisPieceObject: TetrisPiece | null = null;
  private firstOccurenceCurrentTetrisPieceSubject: boolean = true;
  public readonly holdenTetrisPieceSubject = new Subject<TetrisPiece | null>();
  private holdenTetrisPieceObject: TetrisPiece | null = null;
  private firstOccurenceHoldenTetrisPieceSubject: boolean = true;

  public set currentTetrisPiece(piece: TetrisPiece | null) {
    if (this.firstOccurenceCurrentTetrisPieceSubject) {
      this.firstOccurenceCurrentTetrisPieceSubject = false;
      this.currentTetrisPieceSubject.next(null);
    }
    this.currentTetrisPieceSubject.next(piece);
  }

  public get currentTetrisPiece(): TetrisPiece | null {
    return this.currentTetrisPieceObject;
  }

  public set holdenTetrisPiece(piece: TetrisPiece | null) {
    if (this.firstOccurenceHoldenTetrisPieceSubject) {
      this.firstOccurenceHoldenTetrisPieceSubject = false;
      this.holdenTetrisPieceSubject.next(null);
    }
    this.holdenTetrisPieceObject = piece;
    this.holdenTetrisPieceSubject.next(piece);
  }

  public get holdenTetrisPiece(): TetrisPiece | null {
    return this.holdenTetrisPieceObject;
  }
}
