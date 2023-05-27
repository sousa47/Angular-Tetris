import { TetrisPiece } from '../tetris-piece';

export class SquarePiece extends TetrisPiece {
  private _sideLength: number = 0;

  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(sideLength: number): CanvasRenderingContext2D {
    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates,
      sideLength,
      sideLength
    );

    this._sideLength = sideLength;
    this._pieceHeight = this._sideLength;

    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates,
      sideLength,
      sideLength
    );

    // Horizontal inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this._xCoordinates,
      this._yCoordinates + sideLength / 2
    );
    this._canvas!.lineTo(
      this._xCoordinates + sideLength,
      this._yCoordinates + sideLength / 2
    );
    this._canvas!.stroke();

    // Vertical inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this._xCoordinates + sideLength / 2,
      this._yCoordinates
    );
    this._canvas!.lineTo(
      this._xCoordinates + sideLength / 2,
      this._yCoordinates + sideLength
    );
    this._canvas!.stroke();

    return this._canvas!;
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearCanvas();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._sideLength);
    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;
    if (xCoordinates < 0) check = false;
    if (xCoordinates + this._sideLength > this._canvas!.canvas.width)
      check = false;
    if (yCoordinates < 0) check = false;
    if (yCoordinates + this._sideLength > this._canvas!.canvas.height)
      check = false;

    return check;
  }
}
