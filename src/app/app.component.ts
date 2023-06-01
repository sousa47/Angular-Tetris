import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { TetrisGame } from './interfaces/tetris-game';
import { TetrisPiece } from './models/pieces/tetris-piece';
import { TetrisPieceObjectService } from './services/tetris-piece/tetris-piece-object/tetris-piece-object.service';
import { GameService } from './services/game/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements TetrisGame {
  title = 'Tetris with Angular';
  tutorialW = 'Hard Drop';
  tutorialA = 'Move Left';
  tutorialS = 'Move Down';
  tutorialD = 'Move Right';
  tutorialE = 'Rotate Clockwise';
  tutorialF = 'Hold';
  tutorialG = 'Random Piece';

  score: number;
  linesCleared: number;
  nextPieces: TetrisPiece[];
  currentPiece: TetrisPiece | null;
  holdPiece: TetrisPiece | null;

  public constructor(
    private _tetrisPieceObjectService: TetrisPieceObjectService,
    private _gameService: GameService
  ) {
    this.score = 0;
    this.linesCleared = 0;
    this.nextPieces = [];
    this.currentPiece = null;
    this.holdPiece = null;
  }

  generateNextPiece(): void {
    this.nextPieces.push(this._tetrisPieceObjectService.randomPiece);
  }

  holdCurrentPiece(): void {}

  clearLines(lines: number): void {
    throw new Error('Method not implemented.');
  }

  start(): void {
    const button = document.getElementById('start-button') as HTMLButtonElement;
    button.textContent = 'Pause';
    button.addEventListener('click', this.pause);
    this._gameService.startGame();
  }

  pause(): void {
    /*
    const button = document.getElementById('start-button') as HTMLButtonElement;
    button.textContent = 'Resume';
    button.addEventListener('click', this.resume);
    document.onkeydown = () => false;
    this._gameService.pauseGame();
    */
  }

  resume(): void {
    const button = document.getElementById('start-button') as HTMLButtonElement;
    button.textContent = 'Pause';
    button.addEventListener('click', this.pause);
    document.onkeydown = () => true;
  }

  stop(): void {
    throw new Error('Method not implemented.');
  }
  restart(): void {
    throw new Error('Method not implemented.');
  }
}
