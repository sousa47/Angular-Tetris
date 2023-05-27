import { TetrisInput } from 'src/app/interfaces/tetris-input';

export abstract class TetrisPiece implements TetrisInput {
  movement: number = 0;

  protected _pieceHeight: number = 0;

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

  rotatePieceClockwise(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  rotatePieceCounterClockwise(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  movePieceDown(allTheWay: boolean = false): CanvasRenderingContext2D {
    // TODO: Check if the piece can move down (if there is a piece below it)
    return this.movePiece(
      this._xCoordinates,
      allTheWay
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

  protected abstract drawPiece(...args: any): CanvasRenderingContext2D;

  protected abstract movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D;

  protected abstract moveIsPossible(
    xCoordinates: number,
    yCoordinates: number
  ): boolean;

  protected clearCanvas(): void {
    this._canvas!.clearRect(
      0,
      0,
      this._canvas?.canvas.width!,
      this._canvas?.canvas.height!
    );
  }

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

export class LinePiece extends TetrisPiece {
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    throw new Error('Method not implemented.');
  }
}

export class TPiece extends TetrisPiece {
  override moveIsPossible(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
}

export class LPiece extends TetrisPiece {
  override moveIsPossible(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
}

export class JPiece extends TetrisPiece {
  override moveIsPossible(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
}

export class SPiece extends TetrisPiece {
  override moveIsPossible(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
}

export class ZPiece extends TetrisPiece {
  override moveIsPossible(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    throw new Error('Method not implemented.');
  }
}
