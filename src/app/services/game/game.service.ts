import { Injectable } from '@angular/core';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceObjectService } from '../tetris-piece/tetris-piece-object/tetris-piece-object.service';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { NextPiecesService } from '../next-pieces/next-pieces.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private nextGamePieceLogic: Record<string, () => TetrisPiece> = {
    ['IPiece']: () => this._tetrisPieceObjectService.IPiece,
    ['JPiece']: () => this._tetrisPieceObjectService.JPiece,
    ['LPiece']: () => this._tetrisPieceObjectService.LPiece,
    ['OPiece']: () => this._tetrisPieceObjectService.OPiece,
    ['SPiece']: () => this._tetrisPieceObjectService.SPiece,
    ['TPiece']: () => this._tetrisPieceObjectService.TPiece,
    ['ZPiece']: () => this._tetrisPieceObjectService.ZPiece,
  };

  constructor(
    private _tetrisPieceObjectService: TetrisPieceObjectService,
    private _observableTetrisPiece: ObservableTetrisPieceService,
    private _nextPiecesService: NextPiecesService
  ) {}

  public startGame(): void {
    this._observableTetrisPiece.startGame = true;
    const startingPiece = this._tetrisPieceObjectService.randomPiece;
    this._observableTetrisPiece.currentTetrisPiece = startingPiece;
  }

  public pauseGame(): void {
    this._observableTetrisPiece.startGame = false;
  }

  public nextPiece(): void {
    const nextPiece = this._nextPiecesService.setNextPiece();
    this._observableTetrisPiece.currentTetrisPiece =
      this.nextGamePieceLogic['JPiece']();
  }

  public addScore(score: number): void {
    const scoreDiv = document.getElementById('score-value')!;
    const currentScore = parseInt(scoreDiv.innerHTML);
    const newScore = currentScore + score;
    document.getElementById('score-value')!.innerHTML = newScore.toString();
  }
}
