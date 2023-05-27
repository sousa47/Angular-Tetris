import { TetrisPiece } from '../tetris-piece';

export class SquarePiece extends TetrisPiece {
  private _sideLength?: number = 0;
  private _squareColor: string = 'red';

  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._squareColor = color;
  }

  override drawPiece(sideLength: number): CanvasRenderingContext2D {
    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates,
      sideLength,
      sideLength
    );
    
    this._canvas!.fillStyle = this._squareColor;
    this._sideLength = sideLength;
    this._pieceHeight = this._sideLength;

    this.drawBorderAndInnerBorder!();

    return this._canvas!;
  }

  private drawBorderAndInnerBorder?(): void {
    // Outer border.
    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates,
      this._sideLength!,
      this._sideLength!
    );

    // Horizontal inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this._xCoordinates,
      this._yCoordinates + this._sideLength! / 2
    );
    this._canvas!.lineTo(
      this._xCoordinates + this._sideLength!,
      this._yCoordinates + this._sideLength! / 2
    );
    this._canvas!.stroke();

    // Vertical inner line.
    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this._xCoordinates + this._sideLength! / 2,
      this._yCoordinates
    );
    this._canvas!.lineTo(
      this._xCoordinates + this._sideLength! / 2,
      this._yCoordinates + this._sideLength!
    );
    this._canvas!.stroke();
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearCanvas();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._sideLength!);
    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;
    if (xCoordinates < 0) check = false;
    if (xCoordinates + this._sideLength! > this._canvas!.canvas.width)
      check = false;
    if (yCoordinates < 0) check = false;
    if (yCoordinates + this._sideLength! > this._canvas!.canvas.height)
      check = false;

    return check;
  }
}
