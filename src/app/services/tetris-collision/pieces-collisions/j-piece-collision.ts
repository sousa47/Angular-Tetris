import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';

export class JPieceCollision {
  private static pieceToBoardLogic: Record<
    number,
    (currentBoard: number[][], x: number, y: number) => number[][]
  > = {
    0: this.addPieceAt0Degrees,
    90: this.addPieceAt90Degrees,
    180: this.addPieceAt180Degrees,
    270: this.addPieceAt270Degrees,
  };

  private static checkCollisionLogic: Record<
    number,
    (
      currentBoard: number[][],
      x: number,
      y: number,
      direction: 'down' | 'left' | 'right'
    ) => boolean
  > = {
    0: this.checkCollisionAt0Degrees,
    90: this.checkCollisionAt90Degrees,
    180: this.checkCollisionAt180Degrees,
    270: this.checkCollisionAt270Degrees,
  };

  public static addPieceToBoard(
    currentBoard: number[][],
    x: number,
    y: number,
    piece: TetrisPiece
  ): number[][] {
    return this.pieceToBoardLogic[piece.currentRotationDegree](
      currentBoard,
      x,
      y
    );
  }

  public static checkCollision(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right',
    piece: TetrisPiece
  ): boolean {
    return this.checkCollisionLogic[piece.currentRotationDegree](
      currentBoard,
      x,
      y,
      direction
    );
  }

  private static addPieceAt0Degrees(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x + 1][y] = 1;
    currentBoard[x + 1][y + 1] = 1;
    currentBoard[x + 1][y + 2] = 1;

    return currentBoard;
  }

  private static addPieceAt90Degrees(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x][y + 1] = 1;
    currentBoard[x + 1][y] = 1;
    currentBoard[x + 2][y] = 1;

    return currentBoard;
  }

  private static addPieceAt180Degrees(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x][y + 1] = 1;
    currentBoard[x][y + 2] = 1;
    currentBoard[x + 1][y + 2] = 1;

    return currentBoard;
  }

  private static addPieceAt270Degrees(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x][y + 1] = 1;
    currentBoard[x + 1][y + 1] = 1;
    currentBoard[x + 2][y + 1] = 1;

    return currentBoard;
  }

  private static checkCollisionAt0Degrees(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return (
            currentBoard[x + 2][y] === 1 ||
            currentBoard[x + 2][y + 1] === 1 ||
            currentBoard[x + 2][y + 2] === 1
          );
        case 'left':
          return (
            currentBoard[x + 1][y - 1] === 1 || currentBoard[x][y - 1] === 1
          );
        case 'right':
          return (
            currentBoard[x][y + 1] === 1 || currentBoard[x + 1][y + 3] === 1
          );
      }
    } catch {
      return true;
    }
  }

  private static checkCollisionAt90Degrees(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return currentBoard[x + 3][y] === 1 || currentBoard[x][y + 1] === 1;
        case 'left':
          return (
            currentBoard[x][y - 1] === 1 ||
            currentBoard[x + 1][y - 1] === 1 ||
            currentBoard[x + 2][y - 1] === 1
          );
        case 'right':
          return (
            currentBoard[x + 2][y] === 1 ||
            currentBoard[x + 1][y + 1] === 1 ||
            currentBoard[x + 1][y + 1] === 1
          );
      }
    } catch {
      return true;
    }
  }

  private static checkCollisionAt180Degrees(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return (
            currentBoard[x + 1][y] === 1 ||
            currentBoard[x + 1][y + 1] === 1 ||
            currentBoard[x + 2][y + 2] === 1
          );
        case 'left':
          return (
            currentBoard[x][y - 1] === 1 || currentBoard[x + 1][y + 1] === 1
          );
        case 'right':
          return (
            currentBoard[x][y + 3] === 1 || currentBoard[x + 1][y + 3] === 1
          );
      }
    } catch {
      return true;
    }
  }

  private static checkCollisionAt270Degrees(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return (
            currentBoard[x + 1][y] === 1 || currentBoard[x + 3][y + 1] === 1
          );
        case 'left':
          return (
            currentBoard[x][y - 2] === 1 ||
            currentBoard[x + 1][y - 1] === 1 ||
            currentBoard[x + 2][y - 1] === 1
          );
        case 'right':
          return (
            currentBoard[x][y + 2] === 1 ||
            currentBoard[x + 1][y + 2] === 1 ||
            currentBoard[x + 2][y + 2] === 1
          );
      }
    } catch {
      return true;
    }
  }
}
