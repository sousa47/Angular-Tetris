import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';
import { TetrisPieceDrawingService } from 'src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
})
export class MainGameComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  @Output()
  public holdCurrentPieceEvent: EventEmitter<TetrisPiece | null> =
    new EventEmitter();

  @Input()
  public currentHoldenPiece: TetrisPiece | null = null;

  @Input()
  public nextPiece: TetrisPiece | null = null;

  private _currentPiece: TetrisPiece | null = null;
  private _canvas: CanvasRenderingContext2D | null = null;

  public constructor(
    private _tetrisPieceDrawingService: TetrisPieceDrawingService
  ) {}

  public ngAfterViewInit(): void {
    this._canvas = this.canvas.nativeElement.getContext('2d');
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas =
      new Canvas(this.canvas.nativeElement);
  }

  public movePieceRight(): void {
    this._canvas = this._currentPiece!.movePieceRight() || null;
  }

  public movePieceLeft(): void {
    this._canvas = this._currentPiece!.movePieceLeft() || null;
  }

  public movePieceDown(): void {
    this._canvas = this._currentPiece!.movePieceDown() || null;
  }

  public movePieceDownhardDrop(): void {
    this._canvas = this._currentPiece!.movePieceDown(true) || null;
  }

  public rotatePiece(): void {
    this._canvas = this._currentPiece!.rotatePieceClockwise() || null;
  }

  // TODO: Remove later
  getRandomPiece(): void {
    var randomPieceAndPieceDrawing =
      this._tetrisPieceDrawingService.randomPieceAndPieceDrawing;
    this._currentPiece = randomPieceAndPieceDrawing[0];
    this._canvas = randomPieceAndPieceDrawing[1];
  }
}
