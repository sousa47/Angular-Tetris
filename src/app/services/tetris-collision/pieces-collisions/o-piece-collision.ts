export class OPieceCollision {
  public static addPieceToBoard(
    currentBoard: number[][],
    x: number,
    y: number
  ): number[][] {
    currentBoard[x][y] = 1;
    currentBoard[x + 1][y] = 1;
    currentBoard[x][y + 1] = 1;
    currentBoard[x + 1][y + 1] = 1;

    return currentBoard;
  }

  public static checkCollision(
    currentBoard: number[][],
    x: number,
    y: number,
    direction: 'down' | 'left' | 'right'
  ): boolean {
    try {
      switch (direction) {
        case 'down':
          return (
            currentBoard[x + 2][y] === 1 || currentBoard[x + 2][y + 1] === 1
          );
        case 'left':
          return (
            currentBoard[x][y - 1] === 1 || currentBoard[x + 1][y - 1] === 1
          );
        case 'right':
          return (
            currentBoard[x][y + 2] === 1 || currentBoard[x + 1][y + 2] === 1
          );
      }
    } catch {
      return true;
    }
  }
}
