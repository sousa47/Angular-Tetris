import { TetrisPiece } from '../tetris-piece';

export class SPiece extends TetrisPiece {
  override clearPiecePreviousPosition(): void {
    throw new Error('Method not implemented.');
  }
  override rotatePiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
  private _heightLength?: number = 0;
  private _widthLength?: number = 0;
  private _pieceColor: string = 'green';

  // Orientation is based of the extreme piece (to know, see piece going down).
  private _pieceOrientation: 'up' | 'right' | 'down' | 'left' = 'up';

  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._pieceColor = color;
  }

  override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._heightLength = heightLength;
    this._widthLength = widthLength;
    this._pieceHeight = heightLength;
    this._canvas!.fillStyle = this._pieceColor;

    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates + heightLength,
      widthLength,
      heightLength
    );

    // adding the offset piece in the right side
    this._canvas!.fillRect(
      this._xCoordinates + widthLength / 2,
      this._yCoordinates,
      widthLength,
      heightLength
    );

    this.drawBorderAndInnerBorder();

    return this._canvas!;
  }

  private drawBorderAndInnerBorder(): void {
    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates + this._heightLength!,
      this._widthLength!,
      this._heightLength!
    );

    this._canvas!.strokeRect(
      this._xCoordinates + this._widthLength! / 2,
      this._yCoordinates + this._heightLength!,
      this._widthLength! / 2,
      this._heightLength!
    );

    this._canvas!.strokeRect(
      this._xCoordinates + this._widthLength! / 2,
      this._yCoordinates,
      this._widthLength!,
      this._heightLength!
    );

    this._canvas!.strokeRect(
      this._xCoordinates + this._widthLength!,
      this._yCoordinates,
      this._widthLength! / 2,
      this._heightLength!
    );
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearCanvas();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._heightLength!, this._widthLength!);
    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    if (this._pieceOrientation === 'up')
      return this.moveIsPossibleOrientationUp(xCoordinates, yCoordinates);
    if (this._pieceOrientation === 'right')
      return this.moveIsPossibleOrientationRight(xCoordinates, yCoordinates);
    if (this._pieceOrientation === 'down')
      return this.moveIsPossibleOrientationDown(xCoordinates, yCoordinates);
    if (this._pieceOrientation === 'left')
      return this.moveIsPossibleOrientationLeft(xCoordinates, yCoordinates);
    return false;
  }

  private moveIsPossibleOrientationUp(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    var check = true;

    if (
      xCoordinates < 0 ||
      xCoordinates > this._canvas!.canvas.width - this._widthLength!
    )
      check = false;

    if (
      yCoordinates < 0 ||
      yCoordinates > this._canvas!.canvas.height - this._heightLength! * 2
    )
      check = false;

    return check;
  }

  private moveIsPossibleOrientationRight(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    var check = true;

    if (
      xCoordinates < 0 ||
      xCoordinates > this._canvas!.canvas.width - this._heightLength! * 2
    )
      check = false;

    if (
      yCoordinates < 0 ||
      yCoordinates > this._canvas!.canvas.height - this._widthLength!
    )
      check = false;

    return check;
  }

  private moveIsPossibleOrientationDown(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    var check = true;

    if (
      xCoordinates < 0 ||
      xCoordinates > this._canvas!.canvas.width - this._widthLength!
    )
      check = false;

    if (
      yCoordinates < 0 ||
      yCoordinates > this._canvas!.canvas.height - this._heightLength! * 2
    )
      check = false;

    return check;
  }

  private moveIsPossibleOrientationLeft(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    var check = true;

    if (
      xCoordinates < this._heightLength! * 2 ||
      xCoordinates > this._canvas!.canvas.width
    )
      check = false;

    if (
      yCoordinates < 0 ||
      yCoordinates > this._canvas!.canvas.height - this._widthLength!
    )
      check = false;

    return check;
  }
}
