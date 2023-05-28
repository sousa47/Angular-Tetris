import { TetrisInput } from 'src/app/interfaces/tetris-input';

export abstract class TetrisPiece implements TetrisInput {
  movement: number = 0;

  protected _pieceHeight: number = 0;
  protected _pieceWidth: number = 0;

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

  abstract drawPiece(...args: any): CanvasRenderingContext2D;

  abstract movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D;

  abstract moveIsPossible(
    xCoordinates: number,
    yCoordinates: number
  ): boolean;


  rotatePieceClockwise(): CanvasRenderingContext2D {
    return this.rotatePiece();
  }

  abstract rotatePiece(): CanvasRenderingContext2D;

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
