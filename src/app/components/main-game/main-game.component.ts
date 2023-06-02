import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';
import { TetrisPieceDrawingService } from 'src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';
import { ObservableTetrisPieceService } from 'src/app/services/observable-tetris-piece/observable-tetris-piece.service';
import { GameService } from 'src/app/services/game/game.service';
import { TetrisCollisionService } from 'src/app/services/tetris-collision/tetris-collision.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private inputLogic: Record<string, () => void> = {
    ['a']: this.movePieceLeft.bind(this),
    ['s']: this.movePieceDown.bind(this),
    ['d']: this.movePieceRight.bind(this),
    ['e']: this.rotatePiece.bind(this),
    ['w']: this.movePieceDownhardDrop.bind(this),
    ['f']: this.holdCurrentPiece.bind(this),
  };

  private _currentPiece: TetrisPiece | null = null;
  private _canvasContext: CanvasRenderingContext2D | null = null;
  private _canHoldPiece: boolean = true;
  private _canvas: Canvas | undefined;
  private _canvasGridUnit: number = 40;

  private _gameLoopInterval: any = undefined;
  private _previousPieceXPosition: number = 0;
  private _previousPieceYPosition: number = 0;

  public constructor(
    private _tetrisPieceDrawingService: TetrisPieceDrawingService,
    private _observableTetrisPieceService: ObservableTetrisPieceService,
    private _tetrisCollisionService: TetrisCollisionService,
    private _gameService: GameService
  ) {
    this.setObservableTetrisPieceService();
  }

  public ngAfterViewInit(): void {
    this._canvasContext = this.canvas.nativeElement.getContext('2d');
    this._canvas = new Canvas(
      this.canvas.nativeElement,
      undefined,
      undefined,
      -40
    );
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas =
      this._canvas;

    this._tetrisCollisionService.gridScale = this._canvas.gridUnit;
    this._canvasGridUnit = this._canvas.gridUnit;
  }

  private setObservableTetrisPieceService(): void {
    this._observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
      (currentPiece: TetrisPiece | null) => {
        if (currentPiece === null || currentPiece === undefined) return;
        this._currentPiece = currentPiece;
        this.drawPiece();
      }
    );

    this._observableTetrisPieceService.startGameSubject.subscribe(
      (value: boolean) => {
        if (value) {
          this.startGameLoop();
          this._currentPiece?.clearCanvas();
          this._tetrisCollisionService.setTetrisBoard();
        }
      }
    );

    this._observableTetrisPieceService.linesClearedSubject.subscribe(
      (value: number[]) => this.clearLines(value)
    );
  }

  public movePieceRight(): void {
    if (this.checkCollision('right')) return;
    this._currentPiece!.movePieceRight(this._canvasContext!) || null;
  }

  public movePieceLeft(): void {
    if (this.checkCollision('left')) return;
    this._currentPiece!.movePieceLeft(this._canvasContext!) || null;
  }

  public movePieceDown(): void {
    if (this.checkCollision('down')) return;
    this._currentPiece!.movePieceDown(this._canvasContext!) || null;
  }

  public movePieceDownhardDrop(): void {
    const currentYPosition = this._currentPiece!.yCoordinates;
    while (!this.checkCollision('down')) {
      this._currentPiece!.movePieceDown(this._canvasContext!) || null;
    }

    if (this._currentPiece!.yCoordinates == currentYPosition) {
      this.endGameLoop();
    } else {
      this.nextPiece();
    }
  }

  public rotatePiece(): void {
    // check collision before rotating
    this._currentPiece!.rotatePieceClockwise(this._canvasContext!) || null;
  }

  public holdCurrentPiece(): void {
    if (!this._canHoldPiece || !this._currentPiece) return;

    const holdenPiece = this._observableTetrisPieceService.holdenTetrisPiece;
    this._observableTetrisPieceService.holdenTetrisPiece = this._currentPiece!;
    this._canHoldPiece = false;

    if (holdenPiece) {
      this._currentPiece.clearPiecePreviousPosition(this._canvasContext!);
      this._currentPiece = holdenPiece;
      this.drawPiece();
    } else {
      this.nextPiece(false);
    }
  }

  public drawPiece(): void {
    const canvasHalfWidth = this._canvasContext!.canvas.width / 2;
    this._canvasContext = this._currentPiece!.movePiece(
      this._canvasContext!,
      canvasHalfWidth,
      0,
      false
    );
    this._canvasContext = this._tetrisPieceDrawingService.getPieceDrawing(
      this._canvasContext!,
      this._currentPiece!
    );
  }

  private startGameLoop(): void {
    if (this._gameLoopInterval !== undefined) return;

    this._gameLoopInterval = setInterval(() => {
      if (this._currentPiece) this.movePieceDown();

      if (!this.checkIfPieceMoved()) {
        if (this._currentPiece?.yCoordinates == 0) this.endGameLoop();
        this.nextPiece();
      }
    }, this._gameService.gameSpeed);
  }

  private endGameLoop(): void {
    clearInterval(this._gameLoopInterval);
    this._gameLoopInterval = undefined;
    this._gameService.endGame();
  }

  private nextPiece(addCurrentPiece: boolean = true): void {
    if (addCurrentPiece) {
      this._tetrisCollisionService.addPieceToBoard(
        this._currentPiece?.xCoordinates!,
        this._currentPiece?.yCoordinates!,
        this._currentPiece!
      );
    }
    this._canHoldPiece = true;
    this._observableTetrisPieceService.currentTetrisPiece = null;
  }

  private checkIfPieceMoved(): boolean {
    if (
      this._currentPiece?.xCoordinates == this._previousPieceXPosition &&
      this._currentPiece?.yCoordinates == this._previousPieceYPosition
    )
      return false;

    this._previousPieceXPosition = this._currentPiece?.xCoordinates || 0;
    this._previousPieceYPosition = this._currentPiece?.yCoordinates || 0;
    return true;
  }

  private checkCollision(direction: 'down' | 'left' | 'right'): boolean {
    return this._tetrisCollisionService.checkCollision(
      this._currentPiece?.xCoordinates!,
      this._currentPiece?.yCoordinates!,
      direction,
      this._currentPiece!
    );
  }

  private clearLines(lines: number[]): void {
    const numberOfLines = lines.length;

    for (let i = 0; i < numberOfLines; i++) {
      this._canvasContext?.clearRect(
        0,
        lines[i] * this._canvasGridUnit - 1,
        this._canvasContext.canvas.width,
        this._canvasGridUnit + 2
      );
    }

    // move all lines above cleared lines down -> check this
    /*
    this._canvasContext!.save();
    this._canvasContext!.translate(0, this._canvasGridUnit * numberOfLines);
    this._canvasContext!.drawImage(this._canvas?.canvas!, 0, 0);
    this._canvasContext!.restore();
    */

    this._gameService.addScore(numberOfLines * numberOfLines);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this._gameService.gameIsOver) return;
    const inputLogicFuntion = this.inputLogic[event.key];
    if (inputLogicFuntion) inputLogicFuntion();
  }
}
