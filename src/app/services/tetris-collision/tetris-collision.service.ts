import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TetrisCollisionService {
  private _tetrisBoard: number[][] = [];
  private _gridScale: number = 40;

  constructor() {
    this.setTetrisBoard();
  }

  public set gridScale(scale: number) {
    this._gridScale = scale;
  }

  public addPieceToBoard(xCoordinates: number, yCoordinates: number): void {
    const x = Math.floor(yCoordinates / this._gridScale);
    const y = Math.floor(xCoordinates / this._gridScale);

    this.addSquarePieceToArray(x, y);
  }

  public checkCollision(xCoordinates: number, yCoordinates: number): boolean {
    const x = Math.floor(yCoordinates / this._gridScale);
    const y = Math.floor(xCoordinates / this._gridScale);

    return this.checkSquareCollison(x, y);
  }

  private addSquarePieceToArray(x: number, y: number): void {
    this._tetrisBoard[x][y] = 1;
    this._tetrisBoard[x + 1][y] = 1;
    this._tetrisBoard[x][y + 1] = 1;
    this._tetrisBoard[x + 1][y + 1] = 1;
  }

  private checkSquareCollison(x: number, y: number): boolean {
    var check = false;
    try {
      check =
        this._tetrisBoard[x + 2][y] === 1 ||
        this._tetrisBoard[x + 2][y + 1] === 1 ||
        this._tetrisBoard[x][y] === 1 ||
        this._tetrisBoard[x][y + 1] === 1;
    } catch {
      // ignored, out of bounds of array
    }

    return check;
  }

  private setTetrisBoard(): void {
    this._tetrisBoard = Array.from(Array(20), () => new Array(10));
    for (let x = 0; x < 20; x++) {
      this._tetrisBoard[x] = [];
      for (let y = 0; y < 10; y++) {
        this._tetrisBoard[x][y] = 0;
      }
    }
  }
}
