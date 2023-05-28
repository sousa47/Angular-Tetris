import { TetrisInput } from 'src/app/interfaces/tetris-input';

export enum RotationDegree {
  Degree0 = 0,
  Degree90 = 90,
  Degree180 = 180,
  Degree270 = 270,
}

export abstract class TetrisPiece implements TetrisInput {
  movement: number = 20;

  protected _pieceHeight: number = 0;
  protected _pieceWidth: number = 0;
  protected _rotationDegree: RotationDegree = RotationDegree.Degree0;

  constructor(
    protected _xCoordinates: number = 0,
    protected _yCoordinates: number = 0,
    protected _color: string = 'black',
    protected _canvas: CanvasRenderingContext2D | null = null
  ) {
    this._canvas!.fillStyle = this._color;
    this._canvas!.lineWidth = 2;
    this._canvas!.strokeStyle = 'black';
  }

  abstract drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D;

  movePieceDown(hardDrop: boolean = false): CanvasRenderingContext2D {
    // TODO: Check if the piece can move down (if there is a piece below it)
    return this.movePiece(
      this._xCoordinates,
      hardDrop
        ? this._canvas!.canvas.height - this._pieceHeight
        : this._yCoordinates + this.movement
    );
  }

  movePieceLeft(): CanvasRenderingContext2D {
    return this.movePiece(
      this._xCoordinates - this.movement,
      this._yCoordinates
    );
  }

  movePieceRight(): CanvasRenderingContext2D {
    return this.movePiece(
      this._xCoordinates + this.movement,
      this._yCoordinates
    );
  }

  movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearPiecePreviousPosition();
    this.xCoordinates = xCoordinates;
    this.yCoordinates = yCoordinates;
    this.drawPiece(this._pieceHeight, this._pieceWidth);

    return this._canvas!;
  }

  /**
   * Checks if moving the I-shaped Tetris piece to the specified coordinates is possible.
   * @param xCoordinates - The x-coordinate to check.
   * @param yCoordinates - The y-coordinate to check.
   * @returns True if the move is possible, false otherwise.
   */
  moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    return (
      xCoordinates >= 0 &&
      xCoordinates <= this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }

  rotatePieceClockwise(): CanvasRenderingContext2D {
    return this.rotatePiece();
  }

  abstract rotatePiece(): CanvasRenderingContext2D;

  /**
   * Adjusts the new rotation coordinates to ensure they are within the canvas boundaries.
   * @param newXCoordinates - The new x-coordinate after rotation.
   * @param newYCoordinates - The new y-coordinate after rotation.
   */
  setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasWidth = this._canvas!.canvas.width;
    const canvasHeight = this._canvas!.canvas.height;

    if (newXCoordinates < 0) newXCoordinates = 0;
    if (newXCoordinates > canvasWidth - this._pieceHeight)
      newXCoordinates = canvasWidth - this._pieceHeight;

    if (newYCoordinates < 0) newYCoordinates = 0;
    if (newYCoordinates > canvasHeight - this._pieceWidth)
      newYCoordinates = canvasHeight - this._pieceWidth;

    this.xCoordinates = newXCoordinates;
    this.yCoordinates = newYCoordinates;
  }

  clearCanvas(): void {
    this._canvas!.clearRect(
      0,
      0,
      this._canvas?.canvas.width!,
      this._canvas?.canvas.height!
    );
  }

  abstract clearPiecePreviousPosition(): void;

  get xCoordinates(): number {
    return this._xCoordinates;
  }

  set xCoordinates(xCoordinates: number) {
    this._xCoordinates = xCoordinates;
  }

  get yCoordinates(): number {
    return this._yCoordinates;
  }

  set yCoordinates(yCoordinates: number) {
    this._yCoordinates = yCoordinates;
  }
}
