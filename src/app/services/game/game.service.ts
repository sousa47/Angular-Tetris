import { Injectable } from '@angular/core';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceObjectService } from '../tetris-piece/tetris-piece-object/tetris-piece-object.service';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  public gameSpeed: number = 2000;
  public gameIsOver: boolean = false;
  public gameIsLooping: boolean = false;

  public constructor(
    private _tetrisPieceObjectService: TetrisPieceObjectService,
    private _observableTetrisPiece: ObservableTetrisPieceService
  ) {}

  public startGame(): void {
    const gameButton = document.getElementById('start-button')!;
    const gameOverText = document.getElementById('game-over-text')!;
    gameButton.style.display = 'none';
    gameOverText.style.display = 'none';
    this.gameIsOver = false;
    this._observableTetrisPiece.startGame = true;
    const startingPiece = this._tetrisPieceObjectService.randomPiece;
    this._observableTetrisPiece.currentTetrisPiece = startingPiece;
  }

  public endGame(): void {
    const gameButton = document.getElementById('start-button')!;
    const gameOverText = document.getElementById('game-over-text')!;
    gameButton.style.display = 'block';
    gameOverText.style.display = 'block';
    this.gameIsOver = true;
    this._observableTetrisPiece.startGame = false;
  }

  public addScore(score: number): void {
    const scoreDiv = document.getElementById('score-value')!;
    const currentScore = parseInt(scoreDiv.innerHTML);
    const newScore = currentScore + score;
    document.getElementById('score-value')!.innerHTML = newScore.toString();
  }
}
