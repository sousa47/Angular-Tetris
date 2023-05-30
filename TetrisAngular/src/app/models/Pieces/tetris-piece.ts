import { TetrisInput } from 'src/app/interfaces/tetris-input';

/**
 * Represents the rotation degree of a Tetris piece.
 */
export enum RotationDegree {
  Degree0 = 0,
  Degree90 = 90,
  Degree180 = 180,
  Degree270 = 270,
}
Object.freeze(RotationDegree);

/**
 * Abstract base class representing a Tetris piece.
 * Provides common properties and methods for manipulating and drawing Tetris pieces on a canvas.
 * To create a specific Tetris piece, extend this class and implement the abstract methods.
 */
export abstract class TetrisPiece implements TetrisInput {
  /**
   * The movement of the Tetris piece. The default movement is 20 units.
   * A unit is equivalent to the size of the a grid cell.
   */
  public movement: number = 20;

  /**
   * The total height of the Tetris piece.
   */
  protected _pieceHeight: number = 0;

  /**
   * The total width of the Tetris piece.
   */
  protected _pieceWidth: number = 0;

  /**
   * The roation degree of the Tetris piece. The default rotation degree is 0.
   */
  protected _rotationDegree: RotationDegree = 0;

  constructor(
    /**
     * The x-coordinate of the Tetris piece.
     */
    protected _xCoordinates: number = 0,
    /**
     * The y-coordinate of the Tetris piece.
     */
    protected _yCoordinates: number = 0,
    /**
     * The color of the Tetris piece. The default color is black.
     */
    protected _pieceColor: string = 'black',
    /**
     * The canvas rendering context. In case of an invalid context, an error is thrown.
     */
    protected readonly _canvas: CanvasRenderingContext2D | null = null
  ) {
    if (_canvas) {
      this._canvas = _canvas;
      this._canvas.fillStyle = this._pieceColor;
      this._canvas.lineWidth = 2;
      this._canvas.strokeStyle = 'black';
    } else {
      throw new Error('Invalid canvas context.');
    }
  }

  /**
   * Draws the Tetris piece on the canvas.
   * @param heightLength - The height of the Tetris piece.
   * @param widthLength - The width of the Tetris piece.
   * @returns The canvas rendering context.
   */
  public abstract drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D;

  /**
   * Moves the Tetris piece down on the canvas.
   * @param hardDrop - Indicates if the piece should be hard-dropped.
   * @returns The canvas rendering context.
   */
  public movePieceDown(hardDrop: boolean = false): CanvasRenderingContext2D {
    // TODO: Check if the piece can move down (if there is a piece below it)
    return this.movePiece(
      this._xCoordinates,
      hardDrop
        ? this._canvas!.canvas.height - this._pieceHeight
        : this._yCoordinates + this.movement
    );
  }

  /**
   * Draws the Tetris piece and its border on the canvas.
   * @param xCoordinates - The x-coordinate of the piece.
   * @param yCoordinates - The y-coordinate of the piece.
   * @param width - The width of the piece.
   * @param height - The height of the piece.
   * @param fromXLine - The x-coordinate of the starting point of the border line.
   * @param fromYLine - The y-coordinate of the starting point of the border line.
   * @param toXLine - The x-coordinate of the ending point of the border line.
   * @param toYLine - The y-coordinate of the ending point of the border line.
   */
  protected drawPieceAndOuterBorder(
    xCoordinates: number,
    yCoordinates: number,
    width: number,
    height: number,
    fromXLine?: number,
    fromYLine?: number,
    toXLine?: number,
    toYLine?: number
  ): void {
    this._canvas!.fillRect(xCoordinates, yCoordinates, width, height);
    this._canvas!.strokeRect(xCoordinates, yCoordinates, width, height);

    if (
      fromXLine !== undefined &&
      fromYLine !== undefined &&
      toXLine !== undefined &&
      toYLine !== undefined
    ) {
      this._canvas!.beginPath();
      this._canvas!.moveTo(fromXLine, fromYLine);
      this._canvas!.lineTo(toXLine, toYLine);
      this._canvas!.stroke();
    }
  }

  /**
   * Clears the Tetris piece and its border from the canvas.
   * @param xCoordinates - The x-coordinate of the piece.
   * @param yCoordinates - The y-coordinate of the piece.
   * @param width - The width of the piece.
   * @param height - The height of the piece.
   */
  protected clearPieceAndBorder(
    xCoordinates: number,
    yCoordinates: number,
    width: number,
    height: number
  ): void {
    this._canvas!.clearRect(
      xCoordinates - 1,
      yCoordinates - 1,
      width + 2,
      height + 2
    );
  }

  /**
   * Moves the Tetris piece to the left on the canvas.
   * @returns The canvas rendering context.
   */
  public movePieceLeft(): CanvasRenderingContext2D {
    return this.movePiece(
      this._xCoordinates - this.movement,
      this._yCoordinates
    );
  }

  /**
   * Moves the Tetris piece to the right on the canvas.
   * @returns The canvas rendering context.
   */
  public movePieceRight(): CanvasRenderingContext2D {
    return this.movePiece(
      this._xCoordinates + this.movement,
      this._yCoordinates
    );
  }

  /**
   * Moves the Tetris piece to the specified coordinates on the canvas.
   * @param xCoordinates - The x-coordinate to move to.
   * @param yCoordinates - The y-coordinate to move to.
   * @returns The canvas rendering context.
   */
  public movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.canMoveToCoordinates(xCoordinates, yCoordinates))
      return this._canvas!;

    this.clearPiecePreviousPosition();
    this.xCoordinates = xCoordinates;
    this.yCoordinates = yCoordinates;
    this.drawPiece(this._pieceHeight, this._pieceWidth);

    return this._canvas!;
  }

  /**
   * Checks if it is possible to move the Tetris piece to the specified coordinates.
   * @param xCoordinates - The x-coordinate to check.
   * @param yCoordinates - The y-coordinate to check.
   * @returns True if the move is possible, false otherwise.
   */
  public canMoveToCoordinates(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return (
      xCoordinates >= 0 &&
      xCoordinates <= this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }

  /**
   * Rotates the Tetris piece clockwise on the canvas.
   * @returns The canvas rendering context.
   */
  public rotatePieceClockwise(): CanvasRenderingContext2D {
    return this.rotatePiece();
  }

  /**
   * Rotates the Tetris piece on the canvas.
   * @returns The canvas rendering context.
   */
  protected abstract rotatePiece(): CanvasRenderingContext2D;

  /**
   * Adjusts the new rotation coordinates to ensure they are within the canvas boundaries.
   * @param newXCoordinates - The new x-coordinate after rotation.
   * @param newYCoordinates - The new y-coordinate after rotation.
   */
  public setRotationNewCoordinates(
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

  /**
   * Clears the entire canvas.
   */
  public clearCanvas(): void {
    this._canvas!.clearRect(
      0,
      0,
      this._canvas?.canvas.width!,
      this._canvas?.canvas.height!
    );
  }

  /**
   * Clears the previous position of the Tetris piece on the canvas.
   */
  abstract clearPiecePreviousPosition(): void;

  /**
   * Getter for the x-coordinate of the Tetris piece.
   */
  public get xCoordinates(): number {
    return this._xCoordinates;
  }

  /**
   * Setter for the x-coordinate of the Tetris piece.
   */
  public set xCoordinates(xCoordinates: number) {
    this._xCoordinates = xCoordinates;
  }

  /**
   * Getter for the y-coordinate of the Tetris piece.
   */
  public get yCoordinates(): number {
    return this._yCoordinates;
  }

  /**
   * Setter for the y-coordinate of the Tetris piece.
   */
  public set yCoordinates(yCoordinates: number) {
    this._yCoordinates = yCoordinates;
  }
}
