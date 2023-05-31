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
import { ObservableTetrisPieceService } from 'src/app/services/observable-tetris-piece.service';

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
    ['g']: this.getRandomPiece.bind(this),
  };

  private _currentPiece: TetrisPiece | null = null;
  private _canvas: CanvasRenderingContext2D | null = null;
  private _canHoldPiece: boolean = true;

  public constructor(
    private _tetrisPieceDrawingService: TetrisPieceDrawingService,
    private _observableTetrisPieceService: ObservableTetrisPieceService
  ) {
    _observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
      (currentPiece: TetrisPiece | null) => {
        if (!currentPiece) return;
        this._currentPiece = currentPiece;
        this.drawPiece();
      }
    );
  }

  public ngAfterViewInit(): void {
    this._canvas = this.canvas.nativeElement.getContext('2d');
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas =
      new Canvas(this.canvas.nativeElement);
  }

  public movePieceRight(): void {
    this._canvas = this._currentPiece!.movePieceRight(this._canvas!) || null;
  }

  public movePieceLeft(): void {
    this._canvas = this._currentPiece!.movePieceLeft(this._canvas!) || null;
  }

  public movePieceDown(): void {
    this._canvas = this._currentPiece!.movePieceDown(this._canvas!) || null;
  }

  public movePieceDownhardDrop(): void {
    this._canvas =
      this._currentPiece!.movePieceDown(this._canvas!, true) || null;
  }

  public rotatePiece(): void {
    this._canvas =
      this._currentPiece!.rotatePieceClockwise(this._canvas!) || null;
  }

  public holdCurrentPiece(): void {
    if (!this._canHoldPiece || !this._currentPiece) return;
    this._canvas =
      this._currentPiece?.clearPiecePreviousPosition(this._canvas!) || null;

    const holdenPiece = this._observableTetrisPieceService.holdenTetrisPiece;
    this._observableTetrisPieceService.holdenTetrisPiece = this._currentPiece!;
    this._canHoldPiece = false;

    if (holdenPiece) {
      this._currentPiece = holdenPiece;
      this.drawPiece();
    } else {
      this.getRandomPiece();
    }
  }

  public drawPiece(): void {
    const canvasHalfWidth = this._canvas!.canvas.width / 2;
    this._canvas = this._currentPiece!.movePiece(
      this._canvas!,
      canvasHalfWidth,
      0
    );
    this._canvas = this._tetrisPieceDrawingService.getPieceDrawing(
      this._canvas!,
      this._currentPiece!
    );
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const inputLogicFuntion = this.inputLogic[event.key];
    if (inputLogicFuntion) inputLogicFuntion();
  }

  // TODO: Remove later
  getRandomPiece(): void {
    var randomPieceAndPieceDrawing =
      this._tetrisPieceDrawingService.randomPieceAndPieceDrawing(this._canvas!);
    this._currentPiece = randomPieceAndPieceDrawing[0];
    this.drawPiece();
    this._canHoldPiece = true;
  }
}
