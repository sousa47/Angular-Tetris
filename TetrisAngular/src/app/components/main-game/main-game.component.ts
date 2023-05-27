import { Component, ElementRef, ViewChild } from '@angular/core';
import { SquarePiece } from 'src/app/models/Pieces/concrete-pieces/square-piece';
import { CanvasPiecesService } from 'src/app/services/canvas-pieces/canvas-pieces.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css']
})
export class MainGameComponent {

  @ViewChild('canvas', { static: true })  canvas!: ElementRef<HTMLCanvasElement>;

  private _canvas: CanvasRenderingContext2D | null = null;
  squarePiece: SquarePiece | null = null;

  constructor(private _canvasPiecesService: CanvasPiecesService) { }

  ngOnInit(): void {
    this._canvas = this.canvas.nativeElement.getContext('2d');
    this._canvasPiecesService.setCanvas(this._canvas);
    this.squarePiece = new SquarePiece(0, 0, 'red', this._canvas);
    this.squarePiece.movement = 20;
    this._canvas = this.squarePiece.drawPiece(40);
  }

  movePieceRight(): void {
    this._canvas = this.squarePiece?.movePieceRight() || null;
  }

  movePieceLeft(): void {
    this._canvas = this.squarePiece?.movePieceLeft() || null;
  }

  movePieceDown(): void {
    this._canvas = this.squarePiece?.movePieceDown() || null;
  }

  movePieceDownAllTheWay(): void {
    this._canvas = this.squarePiece?.movePieceDown(true) || null;
  }
}
