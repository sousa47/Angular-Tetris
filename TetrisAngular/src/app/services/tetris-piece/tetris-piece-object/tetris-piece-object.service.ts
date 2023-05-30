import { Injectable } from '@angular/core';
import { OPiece } from 'src/app/models/Pieces/concrete-pieces/o-piece';
import { IPiece } from 'src/app/models/Pieces/concrete-pieces/i-piece';
import { TPiece } from 'src/app/models/Pieces/concrete-pieces/t-piece';
import { LPiece } from 'src/app/models/Pieces/concrete-pieces/l-piece';
import { JPiece } from 'src/app/models/Pieces/concrete-pieces/j-piece';
import { SPiece } from 'src/app/models/Pieces/concrete-pieces/s-piece';
import { ZPiece } from 'src/app/models/Pieces/concrete-pieces/z-piece';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';
import { Canvas } from 'src/app/models/canvas';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceObjectService {
  private _tetrisPieces: TetrisPiece[] = [];
  private _canvas?: Canvas;

  public set canvas(canvas: Canvas) {
    this._canvas = canvas;
  }

  public getCanvas(): Canvas {
    if (!this._canvas) throw new Error('Canvas is not set');
    return this._canvas!;
  }

  public get canvasRenderingContext(): CanvasRenderingContext2D | null {
    return this.getCanvas().context;
  }

  public get getPieces(): TetrisPiece[] {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces;
  }

  get randomPiece(): TetrisPiece {
    if (this._tetrisPieces.length === 0) this.generatePieces();
    return this._tetrisPieces[(this._tetrisPieces.length * Math.random()) | 0];
  }

  public get IPiece(): TetrisPiece {
    this.createIPiece();
    return this._tetrisPieces[0];
  }

  public get JPiece(): TetrisPiece {
    this.createJPiece();
    return this._tetrisPieces[1];
  }

  public get LPiece(): TetrisPiece {
    this.createLPiece();
    return this._tetrisPieces[2];
  }

  public get OPiece(): TetrisPiece {
    this.createOPiece();
    return this._tetrisPieces[3];
  }

  public get SPiece(): TetrisPiece {
    this.createSPiece();
    return this._tetrisPieces[4];
  }

  public get TPiece(): TetrisPiece {
    this.createTPiece();
    return this._tetrisPieces[5];
  }

  public get ZPiece(): TetrisPiece {
    this.createZPiece();
    return this._tetrisPieces[6];
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
    if (this.checkIfPieceExists(0)) return;
    var linePiece = new IPiece(
      this.getCanvas().xSpawn,
      0,
      'lightblue',
      this.canvasRenderingContext
    );
    linePiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[0] = linePiece;
  }

  private createJPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(1)) return;
    var jPiece = new JPiece(
      this.getCanvas().xSpawn - this.getCanvas().gridUnit,
      0,
      'blue',
      this.canvasRenderingContext
    );
    jPiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[1] = jPiece;
  }

  private createLPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(2)) return;
    var lPiece = new LPiece(
      this.getCanvas().xSpawn + this.getCanvas().gridUnit,
      0,
      'orange',
      this.canvasRenderingContext
    );
    lPiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[2] = lPiece;
  }

  private createOPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(3)) return;
    var squarePiece = new OPiece(
      this.getCanvas().xSpawn,
      0,
      'yellow',
      this.canvasRenderingContext
    );
    squarePiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[3] = squarePiece;
  }

  private createSPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(4)) return;
    var sPiece = new SPiece(
      this.getCanvas().xSpawn,
      0,
      'green',
      this.canvasRenderingContext
    );
    sPiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[4] = sPiece;
  }

  private createTPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(5)) return;
    var tPiece = new TPiece(
      this.getCanvas().xSpawn,
      0,
      'purple',
      this.canvasRenderingContext
    );
    tPiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[5] = tPiece;
  }

  private createZPiece(): void {
    this.checkIfCanvasNotExists();
    if (this.checkIfPieceExists(6)) return;
    var zPiece = new ZPiece(
      this.getCanvas().xSpawn,
      0,
      'red',
      this.canvasRenderingContext
    );
    zPiece.movement = this.getCanvas().gridUnit;
    this._tetrisPieces[6] = zPiece;
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
