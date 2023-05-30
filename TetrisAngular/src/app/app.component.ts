import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { TetrisGame } from './interfaces/tetris-game';
import { TetrisPiece } from './models/Pieces/tetris-piece';
import { TetrisPieceObjectService } from './services/tetris-piece/tetris-piece-object/tetris-piece-object.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements TetrisGame {
  private inputLogic: Record<string, () => void> = {
    ['j']: this.holdCurrentPiece.bind(this),
  };

  score: number;
  linesCleared: number;
  nextPieces: TetrisPiece[];
  currentPiece: TetrisPiece | null;
  holdPiece: TetrisPiece | null;
  @Output() holdPieceEvent: EventEmitter<TetrisPiece | null> =
    new EventEmitter();
  title = 'TetrisAngular';

  public constructor(
    private _tetrisPieceObjectService: TetrisPieceObjectService
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

  holdCurrentPiece(): void {
    let currentPiece = undefined;

    if (!this.holdPiece) {
      this.generateNextPiece();
      this.currentPiece = this.nextPieces.shift() ?? null;
    } else {
      currentPiece = this.currentPiece;
      this.currentPiece = this.holdPiece;

      // TODO: Remove
      this.generateNextPiece();
      this.currentPiece = this.nextPieces.shift() ?? null;
    }

    this.holdPiece = currentPiece ?? this.currentPiece;
    this.holdPieceEvent.emit(this.holdPiece);
  }

  clearLines(lines: number): void {
    throw new Error('Method not implemented.');
  }
  start(): void {
    throw new Error('Method not implemented.');
  }
  pause(): void {
    throw new Error('Method not implemented.');
  }
  resume(): void {
    throw new Error('Method not implemented.');
  }
  stop(): void {
    throw new Error('Method not implemented.');
  }
  restart(): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const inputLogicFunction = this.inputLogic[event.key];
    if (inputLogicFunction) inputLogicFunction();
  }
}
