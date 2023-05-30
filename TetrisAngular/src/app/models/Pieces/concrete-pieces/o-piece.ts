import { TetrisPiece } from '../tetris-piece';

/**
 * Represents the O-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class OPiece extends TetrisPiece {
  /**
   * Creates a new O-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='yellow'] - The color of the piece. Defaults to 'yellow'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'yellow',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  /**
   * Draws the O-shaped piece on the canvas.
   * @param heightLength The height of the piece.
   * @param widthLength The width of the piece.
   * @returns The canvas context after drawing the piece.
   */
  public override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._pieceColor;

    const squareSize = Math.min(this._pieceHeight, this._pieceWidth);
    const squareXCoordinates =
      this.xCoordinates + (this._pieceWidth - squareSize) / 2;
    const squareYCoordinates =
      this.yCoordinates + (this._pieceHeight - squareSize) / 2;

    this.drawPieceAndOuterBorder(
      squareXCoordinates,
      squareYCoordinates,
      squareSize,
      squareSize
    );
    this.drawPieceInnerBorders();

    return this._canvas!;
  }

  /**
   * Draws the inner lines of the piece.
   */
  private drawPieceInnerBorders(): void {
    const size = Math.min(this._pieceHeight, this._pieceWidth);
    const halfSize = size / 2;

    // Draw horizontal inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(this.xCoordinates, this.yCoordinates + halfSize);
    this._canvas!.lineTo(
      this.xCoordinates + size,
      this.yCoordinates + halfSize
    );
    this._canvas!.stroke();

    // Draw vertical inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(this.xCoordinates + halfSize, this.yCoordinates);
    this._canvas!.lineTo(
      this.xCoordinates + halfSize,
      this.yCoordinates + size
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the previous position of the piece on the canvas.
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
   * Rotates the piece.
   * @returns The canvas context after rotating the piece.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    // Since this is a square, it doesn't truly rotate.
    return this._canvas!;
  }
}
