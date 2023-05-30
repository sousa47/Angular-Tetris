import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';
import { TetrisPieceDrawingService } from 'src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';

@Component({
  selector: 'app-hold-piece',
  templateUrl: './hold-piece.component.html',
  styleUrls: ['./hold-piece.component.css'],
})
export class HoldPieceComponent implements OnChanges, AfterViewInit {
  @ViewChild('holdPieceCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Output()
  public currentPieceEvent: EventEmitter<TetrisPiece | null> =
    new EventEmitter();

  @Input()
  public holdThisPiece: any;

  private _canvas: CanvasRenderingContext2D | null = null;
  private _currentHoldPiece: TetrisPiece | null = null;
  private _canvasGridUnit = 0;
  private _canvasHalfHeight = 0;

  constructor(private _tetrisPieceDrawingService: TetrisPieceDrawingService) {}

  ngAfterViewInit(): void {
    this._canvas = this.canvas.nativeElement.getContext('2d');

    const canvasHalfHeight = this._canvas!.canvas.height / 2;
    const canvas = new Canvas(
      this.canvas.nativeElement,
      undefined,
      undefined,
      canvasHalfHeight
    );
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas = canvas;
    this._canvasGridUnit = canvas.gridUnit;
    this._canvasHalfHeight = canvasHalfHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const holdThisPiece = changes['holdThisPiece'].currentValue;
    if (holdThisPiece) this.holdPiece(holdThisPiece);
  }

  private holdPiece(pieceToHold: TetrisPiece): void {
    const holdenPiece = this._currentHoldPiece;
    this._currentHoldPiece = pieceToHold;

    this._canvas!.translate(
      -(this._canvasGridUnit * 4),
      this._canvasHalfHeight - this._canvasGridUnit * 3
    );

    this._canvas!.clearRect(0, 0, 2000, 2000);

    this._canvas = this._tetrisPieceDrawingService.getPieceDrawing(
      this._canvas!,
      this._currentHoldPiece!
    );

    // Reset current transformation matrix to the identity matrix
    this._canvas!.setTransform(1, 0, 0, 1, 0, 0);

    this.currentPieceEvent.emit(holdenPiece);
  }
}
