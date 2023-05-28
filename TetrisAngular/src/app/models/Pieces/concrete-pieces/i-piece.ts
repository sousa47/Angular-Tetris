import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Represents the I-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class IPiece extends TetrisPiece {
  private _numberOfSections = 4;

  /**
   * Creates a new I-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='lightblue'] - The color of the piece. Defaults to 'lightblue'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'lightblue',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = RotationDegree.Degree90;
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
      this._rotationDegree % 180 === 0 ? this._pieceWidth : this._pieceHeight;

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
        this._rotationDegree % 180 === 0
          ? this.xCoordinates + (sectionLength / this._numberOfSections) * i
          : this.yCoordinates + (sectionLength / this._numberOfSections) * i;

      this._canvas!.beginPath();
      this._canvas!.moveTo(
        this._rotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates,
        this._rotationDegree % 180 === 0
          ? this.yCoordinates
          : sectionLineCoordinates
      );
      this._canvas!.lineTo(
        this._rotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates + this._pieceWidth,
        this._rotationDegree % 180 === 0
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

    switch (this._rotationDegree) {
      case RotationDegree.Degree0:
        newXCoordinates += this._pieceWidth / 4;
        newYCoordinates -= this._pieceWidth / 2;
        this._rotationDegree = RotationDegree.Degree90;
        break;
      case RotationDegree.Degree90:
        newXCoordinates -= this._pieceHeight / 4;
        newYCoordinates += this._pieceHeight / 4;
        this._rotationDegree = RotationDegree.Degree180;
        break;
      case RotationDegree.Degree180:
        newXCoordinates += this._pieceWidth / 2;
        newYCoordinates -= this._pieceWidth / 4;
        this._rotationDegree = RotationDegree.Degree270;
        break;
      case RotationDegree.Degree270:
        newXCoordinates -= this._pieceHeight / 2;
        newYCoordinates += this._pieceHeight / 2;
        this._rotationDegree = RotationDegree.Degree0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }
}
