import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Represents the I-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class IPiece extends TetrisPiece {
  /**
   * The number of inner sections of the I-shaped Tetris piece.
   * Inner sections are the sections that are not the border of the piece.
   */
  private _numberOfSections = 4;

  /**
   * Creates a new I-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='lightblue'] - The color of the piece. Defaults to 'lightblue'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
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
  public override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._pieceColor;

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      widthLength,
      heightLength
    );
    this.drawInnerBorder();

    return this._canvas!;
  }

  /**
   * Draws the inner borders of the I-shaped Tetris piece.
   * This method is called internally by the `drawPiece` method.
   */
  private drawInnerBorder(): void {
    const sectionLength =
      this._rotationDegree % 180 === 0 ? this._pieceWidth : this._pieceHeight;

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
  public override clearPiecePreviousPosition(): void {
    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      this._pieceHeight
    );
  }

  /**
   * Rotates the I-shaped Tetris piece.
   * @returns The canvas rendering context after rotating the piece.
   */
  public override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    const halfWidth = this._pieceWidth / 2;
    const halfHeight = this._pieceHeight / 2;
    const quarterWidth = this._pieceWidth / 4;
    const quarterHeight = this._pieceHeight / 4;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        newXCoordinates += quarterWidth;
        newYCoordinates -= halfWidth;
        this._rotationDegree = 90;
        break;
      case 90:
        newXCoordinates -= quarterHeight;
        newYCoordinates += quarterHeight;
        this._rotationDegree = 180;
        break;
      case 180:
        newXCoordinates += halfWidth;
        newYCoordinates -= quarterWidth;
        this._rotationDegree = 270;
        break;
      case 270:
        newXCoordinates -= halfHeight;
        newYCoordinates += halfHeight;
        this._rotationDegree = 0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }
}
