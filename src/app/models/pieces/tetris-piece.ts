import { TetrisInput } from 'src/app/interfaces/tetris-input';
import { Canvas } from '../canvas';

export enum RotationDegree {
  Degree0 = 0,
  Degree90 = 90,
  Degree180 = 180,
  Degree270 = 270,
}
Object.freeze(RotationDegree);

export abstract class TetrisPiece implements TetrisInput {
  public movement: number = 20;

  protected _pieceHeight: number = 0;
  protected _pieceWidth: number = 0;
  protected _rotationDegree: RotationDegree = 0;
  protected _context: CanvasRenderingContext2D | null = null;

  constructor(
    protected _xCoordinates: number = 0,
    protected _yCoordinates: number = 0,
    protected _pieceColor: string = 'black',
    protected _canvas: Canvas
  ) {
    this._context = this._canvas.context || null;
    this._canvas = _canvas;
    this._context!.fillStyle = this._pieceColor;
    this._context!.lineWidth = 2;
    this._context!.strokeStyle = 'black';
  }

  public abstract drawPiece(
    context: CanvasRenderingContext2D,
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D;

  protected drawPieceAndOuterBorder(
    context: CanvasRenderingContext2D,
    xCoordinates: number,
    yCoordinates: number,
    width: number,
    height: number,
    fromXLine?: number,
    fromYLine?: number,
    toXLine?: number,
    toYLine?: number
  ): CanvasRenderingContext2D {
    context.fillRect(xCoordinates, yCoordinates, width, height);
    context.strokeRect(xCoordinates, yCoordinates, width, height);

    if (
      fromXLine !== undefined &&
      fromYLine !== undefined &&
      toXLine !== undefined &&
      toYLine !== undefined
    ) {
      context.beginPath();
      context.moveTo(fromXLine, fromYLine);
      context.lineTo(toXLine, toYLine);
      context.stroke();
    }

    return context;
  }

  protected clearPieceAndBorder(
    context: CanvasRenderingContext2D,
    xCoordinates: number,
    yCoordinates: number,
    width: number,
    height: number
  ): CanvasRenderingContext2D {
    // -1 and +2 to clear the border
    context.clearRect(
      xCoordinates - 1,
      yCoordinates - 1,
      width + 2,
      height + 2
    );
    return context;
  }

  public movePieceDown(
    context: CanvasRenderingContext2D,
    hardDrop: boolean = false,
    drawPiece: boolean = true
  ): CanvasRenderingContext2D {
    return this.movePiece(
      context,
      this._xCoordinates,
      hardDrop
        ? this._canvas!.canvas.height - this._pieceHeight
        : this._yCoordinates + this.movement,
      true,
      drawPiece
    );
  }

  public movePieceLeft(
    context: CanvasRenderingContext2D,
    drawPiece: boolean = true
  ): CanvasRenderingContext2D {
    return this.movePiece(
      context,
      this._xCoordinates - this.movement,
      this._yCoordinates,
      true,
      drawPiece
    );
  }

  public movePieceRight(
    context: CanvasRenderingContext2D,
    drawPiece: boolean = true
  ): CanvasRenderingContext2D {
    return this.movePiece(
      context,
      this._xCoordinates + this.movement,
      this._yCoordinates,
      true,
      drawPiece
    );
  }

  public movePiece(
    context: CanvasRenderingContext2D,
    xCoordinates: number,
    yCoordinates: number,
    clearPreviousPosition: boolean = true,
    drawPiece: boolean = true
  ): CanvasRenderingContext2D {
    if (!this.canMoveToCoordinates(xCoordinates, yCoordinates))
      return this._context!;

    if (clearPreviousPosition)
      context = this.clearPiecePreviousPosition(context);
    this.xCoordinates = xCoordinates;
    this.yCoordinates = yCoordinates;

    return drawPiece
      ? this.drawPiece(context, this._pieceHeight, this._pieceWidth)
      : this._context!;
  }

  public canMoveToCoordinates(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return (
      xCoordinates >= 0 &&
      xCoordinates <= this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= this._canvas!.gridUnit * -2 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }

  public rotatePieceClockwise(
    context: CanvasRenderingContext2D,
    drawPiece: boolean = true
  ): CanvasRenderingContext2D {
    return this.rotatePiece(context);
  }

  protected abstract rotatePiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D;

  public setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasWidth = this._canvas!.canvas.width;
    const canvasHeight = this._canvas!.canvas.height;

    if (newXCoordinates < 0) newXCoordinates = 0;
    if (newXCoordinates > canvasWidth - this._pieceHeight)
      newXCoordinates = canvasWidth - this._pieceHeight;

    if (newYCoordinates < this._canvas!.gridUnit * -2)
      newYCoordinates = this._canvas!.gridUnit * -2;
    if (newYCoordinates > canvasHeight - this._pieceWidth)
      newYCoordinates = canvasHeight - this._pieceWidth;

    this.xCoordinates = newXCoordinates;
    this.yCoordinates = newYCoordinates;
  }

  public clearCanvas(): void {
    const max = Number.MAX_SAFE_INTEGER;
    this._context!.clearRect(0, 0, max, max);
  }

  public abstract clearPiecePreviousPosition(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D;

  public get xCoordinates(): number {
    return this._xCoordinates;
  }

  public set xCoordinates(xCoordinates: number) {
    this._xCoordinates = xCoordinates;
  }

  public get yCoordinates(): number {
    return this._yCoordinates;
  }

  public set yCoordinates(yCoordinates: number) {
    this._yCoordinates = yCoordinates;
  }

  public get pieceHeight(): number {
    return this._pieceHeight;
  }

  public set pieceHeight(pieceHeight: number) {
    this._pieceHeight = pieceHeight;
  }

  public get pieceWidth(): number {
    return this._pieceWidth;
  }

  public set pieceWidth(pieceWidth: number) {
    this._pieceWidth = pieceWidth;
  }

  public set canvas(canvas: Canvas) {
    this._canvas = canvas;
  }

  public get currentRotationDegree(): RotationDegree {
    return this._rotationDegree;
  }

  public set currentRotationDegree(rotationDegree: RotationDegree) {
    this._rotationDegree = rotationDegree;
  }
}
