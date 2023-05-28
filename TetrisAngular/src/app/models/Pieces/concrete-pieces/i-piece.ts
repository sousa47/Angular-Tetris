import { TetrisPiece } from '../tetris-piece';

/**
 * Represents the I-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class IPiece extends TetrisPiece {
  private _numberOfSections = 4;
  private _currentRotationDegree: 0 | 90 | 180 | 270 = 90;

  /**
   * Creates a new I-shaped Tetris piece.
   * @param xCoordinates - The initial x-coordinate of the piece.
   * @param yCoordinates - The initial y-coordinate of the piece.
   * @param color - The color of the piece. Defaults to 'lightblue'.
   * @param canvas - The canvas rendering context. Defaults to null.
   */
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'lightblue',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  /**
   * Draws the I-shaped Tetris piece on the canvas.
   * @param heightLength - The height of the piece.
   * @param widthLength - The width of the piece.
   * @returns The canvas rendering context after drawing the piece.
   */
  override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._color;

    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates,
      widthLength,
      heightLength
    );
    this.drawBorderAndInnerBorder();

    return this._canvas!;
  }

  /**
   * Draws the outer and inner borders of the I-shaped Tetris piece.
   * This method is called internally by the `drawPiece` method.
   */
  private drawBorderAndInnerBorder(): void {
    const sectionLength =
      this._currentRotationDegree % 180 === 0
        ? this._pieceWidth
        : this._pieceHeight;

    // Outer border.
    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      this._pieceHeight
    );

    // Inner border. (The drawing is all done inside the for loop.)
    for (let i = 1; i < this._numberOfSections; i++) {
      const sectionLineCoordinates =
        this._currentRotationDegree % 180 === 0
          ? this.xCoordinates + (sectionLength / this._numberOfSections) * i
          : this.yCoordinates + (sectionLength / this._numberOfSections) * i;

      this._canvas!.beginPath();
      this._canvas!.moveTo(
        this._currentRotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates,
        this._currentRotationDegree % 180 === 0
          ? this.yCoordinates
          : sectionLineCoordinates
      );
      this._canvas!.lineTo(
        this._currentRotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates + this._pieceWidth,
        this._currentRotationDegree % 180 === 0
          ? this.yCoordinates + this._pieceHeight
          : sectionLineCoordinates
      );
      this._canvas!.stroke();
    }
    // end for
  }

  /**
   * Clears the previous position of the I-shaped Tetris piece on the canvas.
   */
  override clearPiecePreviousPosition(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth + 2,
      this._pieceHeight + 2
    );
  }

  /**
   * Rotates the I-shaped Tetris piece.
   * @returns The canvas rendering context after rotating the piece.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    if (this._currentRotationDegree === 0) {
      newXCoordinates += this._pieceWidth / 4;
      newYCoordinates -= this._pieceWidth / 2;
      this._currentRotationDegree = 90;
    } else if (this._currentRotationDegree === 90) {
      newXCoordinates -= this._pieceHeight / 4;
      newYCoordinates += this._pieceHeight / 4;
      this._currentRotationDegree = 180;
    } else if (this._currentRotationDegree === 180) {
      newXCoordinates += this._pieceWidth / 2;
      newYCoordinates -= this._pieceWidth / 4;
      this._currentRotationDegree = 270;
    } else if (this._currentRotationDegree === 270) {
      newXCoordinates -= this._pieceHeight / 2;
      newYCoordinates += this._pieceHeight / 2;
      this._currentRotationDegree = 0;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }
}
