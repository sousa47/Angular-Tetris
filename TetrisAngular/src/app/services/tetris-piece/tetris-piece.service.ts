import { Injectable } from '@angular/core';
import { SquarePiece } from 'src/app/models/Pieces/concrete-pieces/square-piece';
import { LinePiece } from 'src/app/models/Pieces/concrete-pieces/line-piece';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceService {
  private _tetrisPieces: TetrisPiece[] = [];
  private _canvas: CanvasRenderingContext2D | null = null;
  private _gridUnit = 20;

  set canvas(canvas: CanvasRenderingContext2D | null) {
    this._canvas = canvas;
  }

  get pieces(): TetrisPiece[] {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces;
  }

  get randomPiece(): TetrisPiece {
    return this._tetrisPieces[(this._tetrisPieces.length * Math.random()) | 0];
  }

  get randomPieceAndPieceDrawing(): [TetrisPiece, CanvasRenderingContext2D] {
    var randomPiece = this.randomPiece;

    if (randomPiece === undefined) {
      this.generatePieces();
      randomPiece = this.randomPiece;
    }
    randomPiece.clearCanvas();

    switch (randomPiece.constructor.name) {
      case 'SquarePiece':
        return [randomPiece, this.squarePieceDrawing];
      case 'LinePiece':
        return [randomPiece, this.linePieceDrawing];
      default:
        throw new Error('Random piece is not a valid piece');
    }
  }

  getPieceDrawing(tetrisPiece: TetrisPiece): CanvasRenderingContext2D {
    console.log(tetrisPiece);
    switch (typeof tetrisPiece) {
      case typeof SquarePiece:
        return this.squarePieceDrawing;
      case typeof LinePiece:
        return this.linePieceDrawing;
      default:
        throw new Error('Could not get piece drawing');
    }
  }

  get squarePieceDrawing(): CanvasRenderingContext2D {
    this.createSquarePiece();
    return this._tetrisPieces[0].drawPiece(this._gridUnit * 2);
  }

  get squarePiece(): TetrisPiece {
    this.createSquarePiece();
    return this._tetrisPieces[0];
  }

  get linePieceDrawing(): CanvasRenderingContext2D {
    this.createLinePiece();
    var numberOfSections = 4;
    return this._tetrisPieces[1].drawPiece(
      this._gridUnit * numberOfSections,
      this._gridUnit,
      numberOfSections
    );
  }

  get linePiece(): TetrisPiece {
    this.createLinePiece();
    return this._tetrisPieces[0];
  }

  private generatePieces(): void {
    this.createSquarePiece();
    this.createLinePiece();
  }

  private createSquarePiece(): void {
    this.checkIfCanvasExists();
    var squarePiece = new SquarePiece(0, 0, 'red', this._canvas);
    squarePiece.movement = this._gridUnit;
    this._tetrisPieces[0] = squarePiece;
  }

  private createLinePiece(): void {
    this.checkIfCanvasExists();
    var linePiece = new LinePiece(0, 0, 'blue', this._canvas);
    linePiece.movement = this._gridUnit;
    this._tetrisPieces[1] = linePiece;
  }

  private checkIfCanvasExists(): void {
    if (this._canvas === null)
      throw new Error('Canvas is null, set canvas first');
  }
}
