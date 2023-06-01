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
  @ViewChild('randomy', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private _canvas: CanvasRenderingContext2D | null = null;
  private _currentHoldPiece: TetrisPiece | null = null;

  constructor(
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

  ngAfterViewInit(): void {
    /*
    this._canvas = this.canvas.nativeElement.getContext('2d');

    const canvasHalfHeight = this._canvas!.canvas.height / 2;
    const canvas = new Canvas(
      this.canvas.nativeElement,
      20,
      undefined,
      canvasHalfHeight
    );
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas = canvas;
    */
  }

  private holdPiece(pieceToHold: TetrisPiece): void {
    const holdenPiece = this._currentHoldPiece;
    this._currentHoldPiece = pieceToHold;

    this.postionPiece();

    this._canvas = this._tetrisPieceDrawingService.getPieceDrawing(
      this._canvas!,
      this._currentHoldPiece!
    );

    if (holdenPiece)
      this._observableTetrisPieceService.currentTetrisPiece = holdenPiece;
  }

  private postionPiece(): void {
    this._canvas!.clearRect(0, 0, 2000, 2000);
    this._currentHoldPiece!.clearCanvas();
    this._currentHoldPiece!.movePiece(this._canvas!, 0, 0);

    const setPieceCenterFunction =
      this._currentHoldPiece!.constructor.name === 'TPiece' ||
      this._currentHoldPiece!.constructor.name === 'SPiece'
        ? () => {
            this._currentHoldPiece!.movePieceLeft(this._canvas!);
          }
        : () => {
            this._currentHoldPiece!.movePieceRight(this._canvas!);
          };

    for (let i = 0; i < 2; i++) setPieceCenterFunction();
    this._currentHoldPiece!.movePieceDown(this._canvas!);
    this._currentHoldPiece!.movePieceDown(this._canvas!);
  }
}
