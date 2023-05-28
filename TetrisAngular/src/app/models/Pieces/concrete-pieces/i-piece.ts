import { TetrisPiece } from '../tetris-piece';

export class IPiece extends TetrisPiece {
  private _numberOfSections: number = 0;
  private _pieceColor = 'lightblue';
  private _currentRotationDegree: 0 | 90 | 180 | 270 = 90;

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
    widthLength: number,
    numberOfSections: number = 4
  ): CanvasRenderingContext2D {
    this._numberOfSections = numberOfSections;
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._pieceColor;

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
    // Outer border.
    this._canvas!.strokeRect(
      this._xCoordinates,
      this._yCoordinates,
      this._pieceWidth,
      this._pieceHeight
    );

    // Inner border.
    if (
      this._currentRotationDegree === 90 ||
      this._currentRotationDegree === 270
    ) {
      for (let i = 1; i < this._numberOfSections; i++) {
        var sectionLineYCoordinates =
          this._yCoordinates + (this._pieceHeight / this._numberOfSections) * i;

        this._canvas!.beginPath();
        this._canvas!.moveTo(this._xCoordinates, sectionLineYCoordinates);
        this._canvas!.lineTo(
          this._xCoordinates + this._pieceWidth,
          sectionLineYCoordinates
        );

        this._canvas!.stroke();
      }
    } else {
      for (let i = 1; i < this._numberOfSections; i++) {
        var sectionLineXCoordinates =
          this._xCoordinates + (this._pieceWidth / this._numberOfSections) * i;

        this._canvas!.beginPath();
        this._canvas!.moveTo(sectionLineXCoordinates, this._yCoordinates);
        this._canvas!.lineTo(
          sectionLineXCoordinates,
          this._yCoordinates + this._pieceHeight
        );

        this._canvas!.stroke();
      }
    }
  }

  override clearPiecePreviousPosition(): void {
    this._canvas!.clearRect(
      this._xCoordinates - 1,
      this._yCoordinates - 1,
      this._pieceWidth + 2,
      this._pieceHeight + 2
    );
  }

  override movePiece(
    xCoordinates: number,
    yCoordinates: number
  ): CanvasRenderingContext2D {
    if (!this.moveIsPossible(xCoordinates, yCoordinates)) return this._canvas!;

    this.clearPiecePreviousPosition();
    this._xCoordinates = xCoordinates;
    this._yCoordinates = yCoordinates;
    this.drawPiece(this._pieceHeight, this._pieceWidth, this._numberOfSections);

    return this._canvas!;
  }

  override moveIsPossible(xCoordinates: number, yCoordinates: number): boolean {
    var check = true;

    if (
      xCoordinates < 0 ||
      xCoordinates > this._canvas!.canvas.width - this._pieceWidth
    )
      check = false;
    if (
      yCoordinates < 0 ||
      yCoordinates > this._canvas!.canvas.height - this._pieceHeight
    )
      check = false;

    return check;
  }

  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    var newXCoordinates = this._xCoordinates;
    var newYCoordinates = this._yCoordinates;

    if (this._currentRotationDegree === 0) {
      newXCoordinates += this._pieceWidth / 4;
      newYCoordinates -= this._pieceWidth / 2;
      this._currentRotationDegree = 90;
    } else if (this._currentRotationDegree === 90) {
      newXCoordinates -= this._pieceHeight / 4;
      newYCoordinates += this._pieceHeight / 4;
      this._currentRotationDegree = 180;
    } else if (this._currentRotationDegree === 180) {
      newXCoordinates += this._pieceWidth / 2;
      newYCoordinates -= this._pieceWidth / 4;
      this._currentRotationDegree = 270;
    } else if (this._currentRotationDegree === 270) {
      newXCoordinates -= this._pieceHeight / 2;
      newYCoordinates += this._pieceHeight / 2;
      this._currentRotationDegree = 0;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight, 4);
  }

  private setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    if (newXCoordinates < 0) newXCoordinates = 0;
    if (newXCoordinates > this._canvas!.canvas.width - this._pieceHeight)
      newXCoordinates = this._canvas!.canvas.width - this._pieceHeight;

    if (newYCoordinates < 0) newYCoordinates = 0;
    if (newYCoordinates > this._canvas!.canvas.height - this._pieceWidth)
      newYCoordinates = this._canvas!.canvas.height - this._pieceWidth;

    this._xCoordinates = newXCoordinates;
    this._yCoordinates = newYCoordinates;
  }
}
