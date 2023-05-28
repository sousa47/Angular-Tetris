import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Represents the L-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class LPiece extends TetrisPiece {
  /**
   * Creates a new L-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='orange'] - The color of the piece. Defaults to 'orange'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'orange',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = RotationDegree.Degree0;
  }

  /**
   * Draws the LPiece on the canvas.
   * @param {number} heightLength - The height length of the piece.
   * @param {number} widthLength - The width length of the piece.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._color;

    switch (this._rotationDegree) {
      case RotationDegree.Degree0:
        this.drawLPieceAt0DegreeRotation();
        break;
      case RotationDegree.Degree90:
        this.drawLPieceAt90DegreeRotation();
        break;
      case RotationDegree.Degree180:
        this.drawLPieceAt180DegreeRotation();
        break;
      case RotationDegree.Degree270:
        this.drawLPieceAt270DegreeRotation();
        break;
    }

    return this._canvas!;
  }

  /**
   * Clears the previous position of the LPiece on the canvas.
   */
  override clearPiecePreviousPosition(): void {
    switch (this._rotationDegree) {
      case RotationDegree.Degree0:
        this.clearLPieceAt0DegreeRotation();
        break;
      case RotationDegree.Degree90:
        this.clearLPieceAt90DegreeRotation();
        break;
      case RotationDegree.Degree180:
        this.clearLPieceAt180DegreeRotation();
        break;
      case RotationDegree.Degree270:
        this.clearLPieceAt270DegreeRotation();
        break;
    }
  }

  /**
   * Rotates the LPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case RotationDegree.Degree0:
        newXCoordinates -= this._pieceHeight / 2;
        this._rotationDegree = RotationDegree.Degree90;
        break;
      case RotationDegree.Degree90:
        newXCoordinates -= this._pieceHeight / 3;
        newYCoordinates += this._pieceWidth / 2;
        this._rotationDegree = RotationDegree.Degree180;
        break;
      case RotationDegree.Degree180:
        newYCoordinates -= this._pieceHeight / 2;
        this._rotationDegree = RotationDegree.Degree270;
        break;
      case RotationDegree.Degree270:
        newXCoordinates += this._pieceHeight * (2 / 3);
        this._rotationDegree = RotationDegree.Degree0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }

  /**
   * Draws the LPiece at 0-degree rotation.
   */
  private drawLPieceAt0DegreeRotation(): void {
    this._canvas!.fillRect(
      this.xCoordinates - this._pieceHeight,
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates - this._pieceHeight,
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
      this.xCoordinates - this._pieceWidth / 3,
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.lineTo(
      this.xCoordinates - this._pieceWidth / 3,
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.moveTo(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight / 2
    );
    this._canvas!.lineTo(
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the LPiece at 0-degree rotation.
   */
  private clearLPieceAt0DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - this._pieceHeight - 1,
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

  /**
   * Draws the LPiece at 90-degree rotation.
   */
  private drawLPieceAt90DegreeRotation(): void {
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
      this.yCoordinates + this._pieceWidth,
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.strokeRect(
      this.xCoordinates + this._pieceWidth / 2,
      this.yCoordinates + this._pieceWidth,
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

  /**
   * Clears the LPiece at 90-degree rotation.
   */
  private clearLPieceAt90DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates + this._pieceWidth / 2 - 1,
      this.yCoordinates + this._pieceWidth - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight / 3 + 2
    );
  }

  /**
   * Draws the LPiece at 180-degree rotation.
   */
  private drawLPieceAt180DegreeRotation(): void {
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
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight / 2,
      this._pieceWidth / 3,
      this._pieceHeight / 2
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
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

  /**
   * Clears the LPiece at 180-degree rotation.
   */
  private clearLPieceAt180DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth + 2,
      this._pieceHeight / 2 + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates + this._pieceHeight / 2 - 1,
      this._pieceWidth / 3 + 2,
      this._pieceHeight / 2 + 2
    );
  }

  /**
   * Draws the LPiece at 270-degree rotation.
   */
  private drawLPieceAt270DegreeRotation(): void {
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
      this.yCoordinates,
      this._pieceWidth / 2,
      this._pieceHeight / 3
    );

    this._canvas!.strokeRect(
      this.xCoordinates,
      this.yCoordinates,
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

  /**
   * Clears the LPiece at 270-degree rotation.
   */
  private clearLPieceAt270DegreeRotation(): void {
    this._canvas!.clearRect(
      this.xCoordinates + this._pieceWidth / 2 - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight + 2
    );
    this._canvas!.clearRect(
      this.xCoordinates - 1,
      this.yCoordinates - 1,
      this._pieceWidth / 2 + 2,
      this._pieceHeight / 3 + 2
    );
  }
}
