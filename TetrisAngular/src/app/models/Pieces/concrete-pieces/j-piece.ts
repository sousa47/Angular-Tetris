import { TetrisPiece } from '../tetris-piece';

/**
 * Enumeration of rotation degrees for the JPiece.
 */
enum RotationDegree {
  Degree0 = 0,
  Degree90 = 90,
  Degree180 = 180,
  Degree270 = 270,
}

/**
 * Represents a J-shaped Tetris piece.
 */
export class JPiece extends TetrisPiece {
  private _currentRotationDegree: RotationDegree = RotationDegree.Degree0;

  /**
   * Constructs a new JPiece object.
   * @param xCoordinates The initial x-coordinates of the piece.
   * @param yCoordinates The initial y-coordinates of the piece.
   * @param color The color of the piece. Defaults to 'blue'.
   * @param canvas The canvas rendering context. Defaults to null.
   */
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'blue',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  /**
   * Draws the JPiece on the canvas.
   * @param heightLength The height length of the piece.
   * @param widthLength The width length of the piece.
   * @returns The canvas rendering context after drawing the piece.
   */
  override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._color;

    switch (this._currentRotationDegree) {
      case RotationDegree.Degree0:
        this.drawJPieceAt0DegreeRotation();
        break;
      case RotationDegree.Degree90:
        this.drawJPieceAt90DegreeRotation();
        break;
      case RotationDegree.Degree180:
        this.drawJPieceAt180DegreeRotation();
        break;
      case RotationDegree.Degree270:
        this.drawJPieceAt270DegreeRotation();
        break;
    }

    return this._canvas!;
  }

  /**
   * Clears the previous position of the JPiece on the canvas.
   */
  override clearPiecePreviousPosition(): void {
    switch (this._currentRotationDegree) {
      case RotationDegree.Degree0:
        this.clearJPieceAt0DegreeRotation();
        break;
      case RotationDegree.Degree90:
        this.clearJPieceAt90DegreeRotation();
        break;
      case RotationDegree.Degree180:
        this.clearJPieceAt180DegreeRotation();
        break;
      case RotationDegree.Degree270:
        this.clearJPieceAt270DegreeRotation();
        break;
    }
  }

  /**
   * Rotates the JPiece and updates its position.
   * @returns The canvas rendering context after rotating the piece.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._currentRotationDegree) {
      case RotationDegree.Degree0:
        newXCoordinates += this._pieceHeight / 2;
        this._currentRotationDegree = RotationDegree.Degree90;
        break;
      case RotationDegree.Degree90:
        newXCoordinates -= this._pieceHeight / 3;
        newYCoordinates += this._pieceWidth / 2;
        this._currentRotationDegree = RotationDegree.Degree180;
        break;
      case RotationDegree.Degree180:
        newYCoordinates -= this._pieceHeight / 2;
        this._currentRotationDegree = RotationDegree.Degree270;
        break;
      case RotationDegree.Degree270:
        newXCoordinates += this._pieceHeight / 3;
        newYCoordinates -= this._pieceWidth / 2;
        this._currentRotationDegree = RotationDegree.Degree0;
        break;
    }

    this.xCoordinates = newXCoordinates;
    this.yCoordinates = newYCoordinates;

    this.drawPiece(this._pieceHeight, this._pieceWidth);

    return this._canvas!;
  }

  // Private methods to draw and clear the JPiece for each rotation degree...

  private drawJPieceAt0DegreeRotation(): void {
    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth,
      this._pieceHeight / 2
    );

    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth / 3,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth / 3,
      this._pieceHeight / 2
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth / 3,
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth / 3,
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.stroke();
  }

  private clearJPieceAt0DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates + this._pieceHeight / 2 - 1,
      this._pieceWidth + 2,
      this._pieceHeight / 2 + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 3 + 2,
      this._pieceHeight / 2 + 2
    );
  }

  private drawJPieceAt90DegreeRotation(): void {
    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight
    );

    this._canvas!.fillRect(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.strokeRect(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight / 3
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates + this._pieceHeight / 3
    );
    this._canvas!.moveTo(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight * (2 / 3)
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates + this._pieceHeight * (2 / 3)
    );
    this._canvas!.stroke();
  }

  private clearJPieceAt90DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates + this._pieceWidth / 2 - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight / 3 + 2
    );
  }

  private drawJPieceAt180DegreeRotation(): void {
    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      this._pieceHeight / 2
    );

    this._canvas!.fillRect(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth / 3,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth / 3,
      this._pieceHeight / 2
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth / 3,
      this.yCoordinates
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth / 3,
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth * (2 / 3),
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.stroke();
  }

  private clearJPieceAt180DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth + 2,
      this._pieceHeight / 2 + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates + this._pieceWidth * (2 / 3) - 1,
      this.yCoordinates + this._pieceHeight / 2 - 1,
      this._pieceWidth / 3 + 2,
      this._pieceHeight / 2 + 2
    );
  }

  private drawJPieceAt270DegreeRotation(): void {
    this._canvas!.fillRect(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight
    );

    this._canvas!.strokeRect(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight
    );

    this._canvas!.fillRect(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight * (2 / 3),
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight * (2 / 3),
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates + this._pieceHeight / 3
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + this._pieceHeight / 3
    );
    this._canvas!.moveTo(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates + this._pieceHeight * (2 / 3)
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + this._pieceHeight * (2 / 3)
    );
    this._canvas!.stroke();
  }

  private clearJPieceAt270DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates + this._pieceWidth / 2 - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates + this._pieceHeight * (2 / 3) - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight / 3 + 2
    );
  }
}
