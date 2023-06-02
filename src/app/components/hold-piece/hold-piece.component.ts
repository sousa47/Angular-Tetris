import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';
import { TetrisPieceDrawingService } from 'src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';
import { ObservableTetrisPieceService } from 'src/app/services/observable-tetris-piece/observable-tetris-piece.service';

@Component({
  selector: 'app-hold-piece',
  templateUrl: './hold-piece.component.html',
  styleUrls: ['./hold-piece.component.css'],
})
export class HoldPieceComponent implements AfterViewInit {
  @ViewChild('holdPieceCanvas', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  private _canvasContext: CanvasRenderingContext2D | null = null;
  private _currentHoldPiece: TetrisPiece | null = null;

 public constructor(
    private _tetrisPieceDrawingService: TetrisPieceDrawingService,
    private _observableTetrisPieceService: ObservableTetrisPieceService
  ) {
    _observableTetrisPieceService.holdenTetrisPieceSubject.subscribe(
      (holdPiece: TetrisPiece | null) => {
        if (!holdPiece || holdPiece === this._currentHoldPiece) return;
        this.holdPiece(holdPiece);
      }
    );
  }

  public ngAfterViewInit(): void {
    this._canvasContext = this.canvasElement.nativeElement.getContext('2d');

    const canvasHalfHeight = this._canvasContext!.canvas.height / 2;
    const canvas = new Canvas(
      this.canvasElement.nativeElement,
      20,
      undefined,
      canvasHalfHeight
    );
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas = canvas;
  }

  private holdPiece(pieceToHold: TetrisPiece): void {
    const holdenPiece = this._currentHoldPiece;
    this._currentHoldPiece = pieceToHold;

    this.postionPiece();

    this._canvasContext = this._tetrisPieceDrawingService.getPieceDrawing(
      this._canvasContext!,
      this._currentHoldPiece!
    );

    if (holdenPiece)
      this._observableTetrisPieceService.currentTetrisPiece = holdenPiece;
  }

  private postionPiece(): void {
    this._canvasContext!.clearRect(0, 0, 2000, 2000);
    this._currentHoldPiece!.movePiece(this._canvasContext!, 0, 0);

    const setPieceCenterFunction =
      this._currentHoldPiece!.constructor.name === 'TPiece' ||
      this._currentHoldPiece!.constructor.name === 'SPiece'
        ? () => {
            this._currentHoldPiece!.movePieceLeft(this._canvasContext!);
          }
        : () => {
            this._currentHoldPiece!.movePieceRight(this._canvasContext!);
          };

    for (let i = 0; i < 2; i++) setPieceCenterFunction();
    this._currentHoldPiece!.movePieceDown(this._canvasContext!);
    this._currentHoldPiece!.movePieceDown(this._canvasContext!);
  }
}
