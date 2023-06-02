import { Injectable } from '@angular/core';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';
import { IPiece } from 'src/app/models/pieces/concrete-pieces/i-piece';
import { LPiece } from 'src/app/models/pieces/concrete-pieces/l-piece';
import { JPiece } from 'src/app/models/pieces/concrete-pieces/j-piece';
import { OPiece } from 'src/app/models/pieces/concrete-pieces/o-piece';
import { SPiece } from 'src/app/models/pieces/concrete-pieces/s-piece';
import { TPiece } from 'src/app/models/pieces/concrete-pieces/t-piece';
import { ZPiece } from 'src/app/models/pieces/concrete-pieces/z-piece';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceObjectService {
  private _tetrisPieces: TetrisPiece[] = [];
  private _canvas?: Canvas;

  public set canvas(canvas: Canvas) {
    this._canvas = canvas;
  }

  public get getCanvas(): Canvas {
    if (!this._canvas) throw new Error('Canvas is not set');
    return this._canvas;
  }

  public get canvasRenderingContext(): CanvasRenderingContext2D | null {
    return this.getCanvas.context;
  }

  public get getPieces(): TetrisPiece[] {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces;
  }

  public get randomPiece(): TetrisPiece {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces[(this._tetrisPieces.length * Math.random()) | 0];
  }

  public get IPiece(): TetrisPiece {
    this.createIPiece();
    this._tetrisPieces[PieceIndex.IPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.IPiece];
  }

  public get JPiece(): TetrisPiece {
    this.createJPiece();
    this._tetrisPieces[PieceIndex.JPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.JPiece];
  }

  public get LPiece(): TetrisPiece {
    this.createLPiece();
    this._tetrisPieces[PieceIndex.LPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.LPiece];
  }

  public get OPiece(): TetrisPiece {
    this.createOPiece();
    this._tetrisPieces[PieceIndex.OPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.OPiece];
  }

  public get SPiece(): TetrisPiece {
    this.createSPiece();
    this._tetrisPieces[PieceIndex.SPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.SPiece];
  }

  public get TPiece(): TetrisPiece {
    this.createTPiece();
    this._tetrisPieces[PieceIndex.TPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.TPiece];
  }

  public get ZPiece(): TetrisPiece {
    this.createZPiece();
    this._tetrisPieces[PieceIndex.ZPiece].currentRotationDegree = 0;
    return this._tetrisPieces[PieceIndex.ZPiece];
  }

  private generatePieces(): void {
    this.createIPiece();
    this.createJPiece();
    this.createLPiece();
    this.createOPiece();
    this.createSPiece();
    this.createTPiece();
    this.createZPiece();
  }

  private createIPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.IPiece)) return;
    var linePiece = new IPiece(
      this.getCanvas.xSpawn,
      this.getCanvas.ySpawn,
      'lightblue',
      this.getCanvas!
    );
    linePiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.IPiece] = linePiece;
  }

  private createJPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.JPiece)) return;
    var jPiece = new JPiece(
      this.getCanvas.xSpawn - this.getCanvas.gridUnit,
      this.getCanvas.ySpawn,
      'blue',
      this.getCanvas!
    );
    jPiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.JPiece] = jPiece;
  }

  private createLPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.LPiece)) return;
    var lPiece = new LPiece(
      this.getCanvas.xSpawn + this.getCanvas.gridUnit,
      this.getCanvas.ySpawn,
      'orange',
      this.getCanvas!
    );
    lPiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.LPiece] = lPiece;
  }

  private createOPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.OPiece)) return;
    var squarePiece = new OPiece(
      this.getCanvas.xSpawn,
      this.getCanvas.ySpawn,
      'yellow',
      this.getCanvas!
    );
    squarePiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.OPiece] = squarePiece;
  }

  private createSPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.SPiece)) return;
    var sPiece = new SPiece(
      this.getCanvas.xSpawn,
      this.getCanvas.ySpawn,
      'green',
      this.getCanvas!
    );
    sPiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.SPiece] = sPiece;
  }

  private createTPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.TPiece)) return;
    var tPiece = new TPiece(
      this.getCanvas.xSpawn,
      this.getCanvas.ySpawn,
      'purple',
      this.getCanvas!
    );
    tPiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.TPiece] = tPiece;
  }

  private createZPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(PieceIndex.ZPiece)) return;
    var zPiece = new ZPiece(
      this.getCanvas.xSpawn,
      this.getCanvas.ySpawn,
      'red',
      this.getCanvas!
    );
    zPiece.movement = this.getCanvas.gridUnit;
    this._tetrisPieces[PieceIndex.ZPiece] = zPiece;
  }

  private checkIfCanvasNotExists(): void {
    if (this._canvas === null)
      throw new Error('Canvas does not exist, set it first');
  }

  private checkIfPieceExists(index: number): boolean {
    if (this._tetrisPieces.length === 0) return false;
    return this._tetrisPieces[index] !== undefined;
  }
}

enum PieceIndex {
  IPiece = 0,
  JPiece = 1,
  LPiece = 2,
  OPiece = 3,
  SPiece = 4,
  TPiece = 5,
  ZPiece = 6,
}
