import { Injectable } from '@angular/core';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { OPieceCollision } from './pieces-collisions/o-piece-collision';

@Injectable({
  providedIn: 'root',
})
export class TetrisCollisionService {
  private _tetrisBoard: number[][] = [];
  private _gridScale: number = 40;

  private addPieceToBoardLogic: Record<
    string,
    (x: number, y: number) => number[][]
  > = {
    ['OPiece']: (x, y) =>
      OPieceCollision.addPieceToBoard(this._tetrisBoard, x, y),
  };

  private checkPieceForCollisionLogic: Record<
    string,
    (x: number, y: number, direction: 'down' | 'left' | 'right') => boolean
  > = {
    ['OPiece']: (x, y, direction) =>
      OPieceCollision.checkCollision(this._tetrisBoard, x, y, direction),
  };

  constructor(
    private _observableTetrisPieceService: ObservableTetrisPieceService
  ) {
    this.setTetrisBoard();
  }

  public set gridScale(scale: number) {
    this._gridScale = scale;
  }

  public addPieceToBoard(
    xCoordinates: number,
    yCoordinates: number,
    piece: TetrisPiece
  ): void {
    const x = Math.floor(yCoordinates / this._gridScale);
    const y = Math.floor(xCoordinates / this._gridScale);

    this._tetrisBoard = this.addPieceToBoardLogic[piece.constructor.name](x, y);
    this.checkForLineClear();
  }

  public checkCollision(
    xCoordinates: number,
    yCoordinates: number,
    direction: 'down' | 'left' | 'right',
    piece: TetrisPiece
  ): boolean {
    const x = Math.floor(yCoordinates / this._gridScale);
    const y = Math.floor(xCoordinates / this._gridScale);

    return this.checkPieceForCollisionLogic[piece.constructor.name](
      x,
      y,
      direction
    );
  }

  private setTetrisBoard(): void {
    this._tetrisBoard = Array.from(Array(20).fill(0), () =>
      new Array(10).fill(0)
    );
  }

  private checkForLineClear(): void {
    const linesToClear: number[] = [];
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 10; y++) {
        if (this._tetrisBoard[x][y] === 0) break;
        if (y === 9) linesToClear.push(x);
      }
    }
    this.clearLine(linesToClear);
  }

  private clearLine(lines: number[]): void {
    if (lines.length === 0) return;

    for (let i = 0; i < lines.length; i++) {
      this._tetrisBoard.splice(lines[i], 1);
      this._tetrisBoard.unshift(new Array(10).fill(0));
    }

    this._observableTetrisPieceService.linesCleared = lines;
  }
}
