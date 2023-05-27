import { TetrisPiece } from '../tetris-piece';

export class LinePiece extends TetrisPiece {
  private _heigthLength: number = 0;
  private _widthLength: number = 0;
  private _numberOfSections: number = 0;
  private _lineColor = 'blue';
  private _lineOrientation: 'horizontal' | 'vertical' = 'vertical';

  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string,
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._lineColor = color;
  }

  override drawPiece(
    heightLength: number,
    widthLength: number,
    numberOfSections: number = 4
  ): CanvasRenderingContext2D {
    this._canvas!.fillRect(
      this._xCoordinates,
      this._yCoordinates,
      widthLength,
      heightLength
    );

    this._heigthLength = heightLength;
    this._widthLength = widthLength;
    this._numberOfSections = numberOfSections;
    this._pieceHeight = heightLength | widthLength;

    this._canvas!.fillStyle = this._lineColor;
    this.drawBorderAndInnerBorder();

    return this._canvas!;
  }

  private drawBorderAndInnerBorder(): void {
    // Outer border.
    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates,
      this._widthLength,
      this._heigthLength
    );

    // Inner border.
    for (let i = 1; i < this._numberOfSections; i++) {
      var sectionLineYCoordinates =
        this._yCoordinates + (this._heigthLength / this._numberOfSections) * i;

      this._canvas!.beginPath();
      this._canvas!.moveTo(this._xCoordinates, sectionLineYCoordinates);
      this._canvas!.lineTo(
        this._xCoordinates + this._widthLength,
        sectionLineYCoordinates
      );
      this._canvas!.stroke();
    }
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearCanvas();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._heigthLength, this._widthLength, this._numberOfSections);
    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {  
    return this._lineOrientation === 'horizontal' ?
      this.moveIsPossibleHorizontal(xCoordinates, yCoordinates) :
      this.moveIsPossibleVertical(xCoordinates, yCoordinates); 
  }

  private moveIsPossibleHorizontal(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;

    if (xCoordinates < 0 || xCoordinates > this._canvas!.canvas.width - this._heigthLength) check = false;
    if (yCoordinates < 0 || yCoordinates > this._canvas!.canvas.height - this._widthLength) check = false;

    return check;
  }

  private moveIsPossibleVertical(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;

    if (xCoordinates < 0 || xCoordinates > this._canvas!.canvas.width - this._widthLength) check = false;
    if (yCoordinates < 0 || yCoordinates > this._canvas!.canvas.height - this._heigthLength) check = false;

    return check;
  }
}
