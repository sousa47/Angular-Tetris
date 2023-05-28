import { Injectable } from '@angular/core';
import { OPiece } from 'src/app/models/Pieces/concrete-pieces/o-piece';
import { IPiece } from 'src/app/models/Pieces/concrete-pieces/i-piece';
import { TPiece } from 'src/app/models/Pieces/concrete-pieces/t-piece';
import { LPiece } from 'src/app/models/Pieces/concrete-pieces/l-piece';
import { JPiece } from 'src/app/models/Pieces/concrete-pieces/j-piece';
import { SPiece } from 'src/app/models/Pieces/concrete-pieces/s-piece';
import { ZPiece } from 'src/app/models/Pieces/concrete-pieces/z-piece';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceService {
  private _tetrisPieces: TetrisPiece[] = [];
  private _canvas: CanvasRenderingContext2D | null = null;
  private _gridUnit = 20;
  private _xSpawn = 0;

  set canvas(canvas: CanvasRenderingContext2D | null) {
    this._canvas = canvas;
    this._xSpawn = this._canvas!.canvas.width / 2 - this._gridUnit;
  }

  get pieces(): TetrisPiece[] {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces;
  }

  get randomPiece(): TetrisPiece {
    // return this._tetrisPieces[(this._tetrisPieces.length * Math.random()) | 0];
    return this._tetrisPieces[4];
  }

  get randomPieceAndPieceDrawing(): [TetrisPiece, CanvasRenderingContext2D] {
    if (this._tetrisPieces.length === 0) this.generatePieces();

    var randomPiece = this.randomPiece;
    randomPiece.clearCanvas();
    return [randomPiece, this.getPieceDrawing(randomPiece)];
  }

  getPieceDrawing(tetrisPiece: TetrisPiece): CanvasRenderingContext2D {
    switch (tetrisPiece.constructor.name) {
      case 'OPiece':
        return this.oPieceDrawing;
      case 'IPiece':
        return this.iPieceDrawing;
      case 'TPiece':
        return this.tPieceDrawing;
      case 'LPiece':
        return this.lPieceDrawing;
      case 'JPiece':
        return this.jPieceDrawing;
      case 'SPiece':
        return this.sPieceDrawing;
      case 'ZPiece':
        return this.zPieceDrawing;
      default:
        throw new Error("Piece is not a valid piece, couldn't get drawing");
    }
  }

  get oPieceDrawing(): CanvasRenderingContext2D {
    this.createOPiece();
    return this._tetrisPieces[0].drawPiece(
      this._gridUnit * 2,
      this._gridUnit * 2
    );
  }

  get oPiece(): TetrisPiece {
    this.createOPiece();
    return this._tetrisPieces[0];
  }

  get iPieceDrawing(): CanvasRenderingContext2D {
    this.createIPiece();
    var numberOfSections = 4;
    return this._tetrisPieces[1].drawPiece(
      this._gridUnit * numberOfSections,
      this._gridUnit
    );
  }

  get iPiece(): TetrisPiece {
    this.createIPiece();
    return this._tetrisPieces[1];
  }

  get tPieceDrawing(): CanvasRenderingContext2D {
    this.createTPiece();
    return this._tetrisPieces[2].drawPiece(this._gridUnit, this._gridUnit * 3);
  }

  get tPiece(): TetrisPiece {
    this.createTPiece();
    return this._tetrisPieces[2];
  }

  get lPieceDrawing(): CanvasRenderingContext2D {
    this.createLPiece();
    return this._tetrisPieces[3].drawPiece(this._gridUnit, this._gridUnit * 3);
  }

  get lPiece(): TetrisPiece {
    this.createLPiece();
    return this._tetrisPieces[3];
  }

  get jPieceDrawing(): CanvasRenderingContext2D {
    this.createJPiece();
    return this._tetrisPieces[4].drawPiece(
      this._gridUnit * 2,
      this._gridUnit * 3
    );
  }

  get jPiece(): TetrisPiece {
    this.createJPiece();
    return this._tetrisPieces[4];
  }

  get sPieceDrawing(): CanvasRenderingContext2D {
    this.createSPiece();
    return this._tetrisPieces[5].drawPiece(this._gridUnit, this._gridUnit * 2);
  }

  get sPiece(): TetrisPiece {
    this.createSPiece();
    return this._tetrisPieces[5];
  }

  get zPieceDrawing(): CanvasRenderingContext2D {
    this.createZPiece();
    return this._tetrisPieces[6].drawPiece(this._gridUnit, this._gridUnit * 2);
  }

  get zPiece(): TetrisPiece {
    this.createZPiece();
    return this._tetrisPieces[6];
  }

  private generatePieces(): void {
    this.createOPiece();
    this.createIPiece();
    this.createTPiece();
    this.createLPiece();
    this.createJPiece();
    this.createSPiece();
    this.createZPiece();
  }

  private createOPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var squarePiece = new OPiece(this._xSpawn, 0, 'yellow', this._canvas);
    squarePiece.movement = this._gridUnit;
    this._tetrisPieces[0] = squarePiece;
  }

  private createIPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var linePiece = new IPiece(this._xSpawn, 0, 'lightblue', this._canvas);
    linePiece.movement = this._gridUnit;
    this._tetrisPieces[1] = linePiece;
  }

  private createTPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var tPiece = new TPiece(this._xSpawn, 0, 'purple', this._canvas);
    tPiece.movement = this._gridUnit;
    this._tetrisPieces[2] = tPiece;
  }

  private createLPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var lPiece = new LPiece(this._xSpawn, 0, 'orange', this._canvas);
    lPiece.movement = this._gridUnit;
    this._tetrisPieces[3] = lPiece;
  }

  private createJPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var jPiece = new JPiece(
      this._xSpawn - this._gridUnit,
      0,
      'blue',
      this._canvas
    );
    jPiece.movement = this._gridUnit;
    this._tetrisPieces[4] = jPiece;
  }

  private createSPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var sPiece = new SPiece(
      this._xSpawn - this._gridUnit,
      0,
      'green',
      this._canvas
    );
    sPiece.movement = this._gridUnit;
    this._tetrisPieces[5] = sPiece;
  }

  private createZPiece(): void {
    if (this.checkIfCanvasNotExists())
      throw new Error('Canvas does not exist, set it first');
    var zPiece = new ZPiece(this._xSpawn, 0, 'red', this._canvas);
    zPiece.movement = this._gridUnit;
    this._tetrisPieces[6] = zPiece;
  }

  private checkIfCanvasNotExists(): boolean {
    return this._canvas === null;
  }
}
