import { TetrisPiece } from '../tetris-piece';

export class ZPiece extends TetrisPiece {
  override clearPiecePreviousPosition(): void {
    throw new Error('Method not implemented.');
  }
  override rotatePiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
  private _heightLength?: number = 0;
  private _widthLength?: number = 0;
  private _pieceColor: string = 'red';

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
      this._xCoordinates + widthLength / 2,
      this._yCoordinates + heightLength,
      widthLength,
      heightLength
    );

    // adding the offset piece in the left side
    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates,
      widthLength,
      heightLength
    );

    this.drawBorderAndInnerBorder();

    return this._canvas!;
  }

  private drawBorderAndInnerBorder(): void {
    this._canvas!.strokeRect(
      this._xCoordinates + this._widthLength! / 2,
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
      this._xCoordinates,
      this._yCoordinates,
      this._widthLength!,
      this._heightLength!
    );

    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates,
      this._widthLength! / 2,
      this._heightLength!
    );
  }
}
