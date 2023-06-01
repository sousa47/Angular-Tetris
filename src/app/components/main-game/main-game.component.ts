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

  private _gameLoop: boolean = true;
  private _gameSpeed = 1000;
  private _previousPieceXPosition: number = 0;
  private _previousPieceYPosition: number = 0;

  public constructor(
    private _tetrisPieceDrawingService: TetrisPieceDrawingService,
    private _observableTetrisPieceService: ObservableTetrisPieceService,
    private _tetrisCollisionService: TetrisCollisionService
  ) {
    _observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
      (currentPiece: TetrisPiece | null) => {
        console.log(currentPiece);
        if (currentPiece === null) return;
        this._currentPiece = currentPiece;
        this.drawPiece();
      }
    );

    _observableTetrisPieceService.startGameSubject.subscribe(
      (value: boolean) => {
        if (value && this._gameLoop) {
          this._gameSpeed = 1000;
          this.startGameLoop();
        } else {
          this._gameSpeed = 0;
          this._gameLoop = false;
        }
      }
    );
  }

  public ngAfterViewInit(): void {
    this._canvasContext = this.canvas.nativeElement.getContext('2d');
    this._canvas = new Canvas(this.canvas.nativeElement);
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas =
      this._canvas;

    this._tetrisCollisionService.gridScale = this._canvas.gridUnit;
  }

  public movePieceRight(): void {
    const newContext =
      this._currentPiece!.movePieceRight(this._canvasContext!) || null;

    this.setNewContext(newContext);
  }

  public movePieceLeft(): void {
    const newContext =
      this._currentPiece!.movePieceLeft(this._canvasContext!) || null;

    this.setNewContext(newContext);
  }

  public movePieceDown(): void {
    const newContext =
      this._currentPiece!.movePieceDown(this._canvasContext!) || null;

    this.setNewContext(newContext);
  }

  public movePieceDownhardDrop(): void {
    const newContext =
      this._currentPiece!.movePieceDown(this._canvasContext!, true) || null;

    this.setNewContext(newContext);
  }

  public rotatePiece(): void {
    const newContext =
      this._currentPiece!.rotatePieceClockwise(this._canvasContext!) || null;

    this.setNewContext(newContext);
  }

  public holdCurrentPiece(): void {
    if (!this._canHoldPiece || !this._currentPiece) return;

    const holdenPiece = this._observableTetrisPieceService.holdenTetrisPiece;
    this._observableTetrisPieceService.holdenTetrisPiece = this._currentPiece!;
    this._canHoldPiece = false;

    if (holdenPiece) {
      this._currentPiece = holdenPiece;
      this.drawPiece();
    } else {
      // next piece;
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
    setInterval(() => {
      if (!this.checkIfPieceMoved()) {
        this.nextPiece();
      }

      if (this._currentPiece && this._gameSpeed != 0) {
        this.movePieceDown();
      }
    }, this._gameSpeed);
  }

  private nextPiece(): void {
    // this._gameService.nextPiece();
    this._tetrisCollisionService.addPieceToBoard(
      this._currentPiece?.xCoordinates!,
      this._currentPiece?.yCoordinates!
    );
    this._currentPiece = this.nextGamePieceLogic['OPiece']();
    this.drawPiece();
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

  private checkCollision(): boolean {
    return this._tetrisCollisionService.checkCollision(
      this._currentPiece?.xCoordinates!,
      this._currentPiece?.yCoordinates!
    );
  }

  private setNewContext(context: CanvasRenderingContext2D): void {
    if (this.checkCollision()) this.nextPiece();
    this._canvasContext = context;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const inputLogicFuntion = this.inputLogic[event.key];
    if (inputLogicFuntion) inputLogicFuntion();
  }

  private nextGamePieceLogic: Record<string, () => TetrisPiece> = {
    ['IPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.IPiece,
    ['JPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.JPiece,
    ['LPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.LPiece,
    ['OPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.OPiece,
    ['SPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.SPiece,
    ['TPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.TPiece,
    ['ZPiece']: () =>
      this._tetrisPieceDrawingService.tetrisPieceObjectService.ZPiece,
  };
}
