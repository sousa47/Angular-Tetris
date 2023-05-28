/**
 * Represents the input methods for controlling the Tetris game.
 */
export interface TetrisInput {
  /**
   * The number of pixels to move the Tetris piece. Pixels are determined by the size of the Tetris piece.
   * A value of 0 indicates no movement. A negative movement will invert the direction of the movement.
   */
  movement: number;

  /**
   * Rotates the current game piece clockwise.
   * This method should be called when the user wants to rotate the Tetris piece in a clockwise direction.
   * It is typically triggered by a key press event or a user interaction.
   */
  rotatePieceClockwise(): void;

  /**
   * Moves the current game piece down.
   * This method should be called to move the Tetris piece one step down on the game board.
   * @param hardDrop - Indicates whether to perform a hard drop, instantly dropping the piece to the lowest possible position.
   * When set to true, the Tetris piece will instantly move to the bottom of the game board.
   * When set to false, the Tetris piece will move down by one step.
   * This method is usually triggered by a timer or user input.
   */
  movePieceDown(hardDrop: boolean): void;

  /**
   * Moves the current game piece to the left.
   * This method should be called to move the Tetris piece one step to the left on the game board.
   * It is typically triggered by a key press event or a user interaction.
   */
  movePieceLeft(): void;

  /**
   * Moves the current game piece to the right.
   * This method should be called to move the Tetris piece one step to the right on the game board.
   * It is typically triggered by a key press event or a user interaction.
   */
  movePieceRight(): void;
}
