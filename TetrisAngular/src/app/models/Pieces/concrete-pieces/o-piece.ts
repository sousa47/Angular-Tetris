import { TetrisPiece } from '../tetris-piece';

export class OPiece extends TetrisPiece {
  override clearPiecePreviousPosition(): void {
    throw new Error('Method not implemented.');
  }
  private _sideLength?: number = 0;
  private _pieceColor: string = 'yellow';

  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._pieceColor = color;
  }

  override drawPiece(sideLength: number): CanvasRenderingContext2D {
    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates,
      sideLength,
      sideLength
    );

    this._canvas!.fillStyle = this._pieceColor;
    this._sideLength = sideLength;
    this._pieceHeight = this._sideLength;
    this._pieceWidth = this._sideLength;

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

    this.clearPiecePreviousPosition();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._sideLength!);
    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;

    if (
      xCoordinates < 0 ||
      xCoordinates + this._sideLength! > this._canvas!.canvas.width
    )
      check = false;

    if (
      yCoordinates < 0 ||
      yCoordinates + this._sideLength! > this._canvas!.canvas.height
    )
      check = false;

    return check;
  }

  override rotatePiece(): CanvasRenderingContext2D {
    // Since this is a square, it doesn't trully rotate.
    return this._canvas!;
  }
}
