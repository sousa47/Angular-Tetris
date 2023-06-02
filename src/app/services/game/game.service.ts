import { Injectable } from '@angular/core';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceObjectService } from '../tetris-piece/tetris-piece-object/tetris-piece-object.service';
@Injectable({
  providedIn: 'root',
})
export class GameService {

  public constructor(
    private _tetrisPieceObjectService: TetrisPieceObjectService,
    private _observableTetrisPiece: ObservableTetrisPieceService
  ) {}

  public startGame(): void {
    this._observableTetrisPiece.startGame = true;
    const startingPiece = this._tetrisPieceObjectService.randomPiece;
    this._observableTetrisPiece.currentTetrisPiece = startingPiece;
  }

  public addScore(score: number): void {
    const scoreDiv = document.getElementById('score-value')!;
    const currentScore = parseInt(scoreDiv.innerHTML);
    const newScore = currentScore + score;
    document.getElementById('score-value')!.innerHTML = newScore.toString();
  }
}
