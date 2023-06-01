import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';

export class IPieceCollision {
  public static addPieceToBoard(
    currentBoard: number[][],
    x: number,
    y: number,
    piece: TetrisPiece
  ): number[][] {
    return piece.currentRotationDegree % 180 === 0
      ? this.addPieceHorizontal(currentBoard, x, y)
      : this.addPieceVertical(currentBoard, x, y);
  }

  public static checkCollision(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right',
    piece: TetrisPiece
  ): boolean {
    return piece.currentRotationDegree % 180 === 0
      ? this.checkCollisionHorizontal(currentBoard, x, y, direction)
      : this.checkCollisionVertical(currentBoard, x, y, direction);
  }

  private static addPieceHorizontal(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x][y + 1] = 1;
    currentBoard[x][y + 2] = 1;
    currentBoard[x][y + 3] = 1;

    return currentBoard;
  }

  private static addPieceVertical(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x + 1][y] = 1;
    currentBoard[x + 2][y] = 1;
    currentBoard[x + 3][y] = 1;

    return currentBoard;
  }

  private static checkCollisionHorizontal(
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
            currentBoard[x + 1][y + 2] === 1 ||
            currentBoard[x + 1][y + 3] === 1
          );
        case 'left':
          return currentBoard[x][y - 1] === 1;
        case 'right':
          return currentBoard[x][y + 4] === 1;
      }
    } catch {
      return true;
    }
  }

  private static checkCollisionVertical(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return currentBoard[x + 4][y] === 1;
        case 'left':
          return (
            currentBoard[x][y - 1] === 1 ||
            currentBoard[x + 1][y - 1] === 1 ||
            currentBoard[x + 2][y - 1] === 1 ||
            currentBoard[x + 3][y - 1] === 1
          );
        case 'right':
          return (
            currentBoard[x][y + 1] === 1 ||
            currentBoard[x + 1][y + 1] === 1 ||
            currentBoard[x + 2][y + 1] === 1 ||
            currentBoard[x + 3][y + 1] === 1
          );
      }
    } catch {
      return true;
    }
  }
}
