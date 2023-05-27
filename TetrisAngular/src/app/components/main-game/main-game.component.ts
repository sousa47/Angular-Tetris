import { Component, ElementRef, ViewChild } from '@angular/core';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';
import { TetrisCanvasService } from 'src/app/services/tetris-canvas/tetris-canvas.service';
import { TetrisPieceService } from 'src/app/services/tetris-piece/tetris-piece.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent {

  @ViewChild('canvas', { static: true })  canvas!: ElementRef<HTMLCanvasElement>;

  private _canvas: CanvasRenderingContext2D | null = null;
  private _currentPiece: TetrisPiece | null = null;

  constructor(private _tetrisCanvasService: TetrisCanvasService, private _tetrisPieceService: TetrisPieceService) { }

  ngOnInit(): void {
    this._canvas = this.canvas.nativeElement.getContext('2d');
    this._tetrisCanvasService.setCanvas(this._canvas);
    this._tetrisPieceService.canvas = this._canvas;
  }

  movePieceRight(): void {
    this._canvas = this._currentPiece!.movePieceRight() || null;
  }

  movePieceLeft(): void {
    this._canvas = this._currentPiece!.movePieceLeft() || null;
  }

  movePieceDown(): void {
    this._canvas = this._currentPiece!.movePieceDown() || null;
  }

  movePieceDownAllTheWay(): void {
    this._canvas = this._currentPiece!.movePieceDown(true) || null;
  }

  getRandomPiece(): void {
   var randomPieceAndPieceDrawing = this._tetrisPieceService.randomPieceAndPieceDrawing;
   this._currentPiece = randomPieceAndPieceDrawing[0];
   this._canvas = randomPieceAndPieceDrawing[1];
  }
}
