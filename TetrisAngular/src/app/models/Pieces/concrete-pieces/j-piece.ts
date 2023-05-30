import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Represents the J-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class JPiece extends TetrisPiece {
  /**
   * Object containing the logic functions for drawing the piece based on rotation degree.
   */
  private rotationDrawPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.drawJPieceAt0DegreeRotation.bind(this),
    [90]: this.drawJPieceAt90DegreeRotation.bind(this),
    [180]: this.drawJPieceAt180DegreeRotation.bind(this),
    [270]: this.drawJPieceAt270DegreeRotation.bind(this),
  };

  /**
   * Object containing the logic functions for clear the piece based on rotation degree.
   */
  private rotationClearPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.clearJPieceAt0DegreeRotation.bind(this),
    [90]: this.clearJPieceAt90DegreeRotation.bind(this),
    [180]: this.clearJPieceAt180DegreeRotation.bind(this),
    [270]: this.clearJPieceAt270DegreeRotation.bind(this),
  };

  /**
   * Creates a new J-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='blue'] - The color of the piece. Defaults to 'blue'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'blue',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = 0;
  }

  /**
   * Draws the JPiece on the canvas.
   * @param {number} heightLength - The height length of the piece.
   * @param {number} widthLength - The width length of the piece.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  public override drawPiece(
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    this._canvas!.fillStyle = this._pieceColor;

    const rotationLogicFunction =
      this.rotationDrawPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();

    return this._canvas!;
  }

  /**
   * Clears the previous position of the JPiece on the canvas.
   */
  public override clearPiecePreviousPosition(): void {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();
  }

  /**
   * Rotates the JPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    const halfHeight = this._pieceHeight / 2;
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        newXCoordinates += halfHeight;
        this._rotationDegree = 90;
        break;
      case 90:
        newXCoordinates -= thirdHeight;
        newYCoordinates += halfWidth;
        this._rotationDegree = 180;
        break;
      case 180:
        newYCoordinates -= halfHeight;
        this._rotationDegree = 270;
        break;
      case 270:
        this._rotationDegree = 0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }

  /**
   * Draws the JPiece at 0-degree rotation.
   */
  private drawJPieceAt0DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this._pieceWidth,
      halfHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      thirdWidth,
      halfHeight
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );
    this._canvas!.lineTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.moveTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight
    );
    this._canvas!.lineTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + this._pieceHeight
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the JPiece at 0-degree rotation.
   */
  private clearJPieceAt0DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this._pieceWidth,
      halfHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      thirdWidth,
      halfHeight
    );
  }

  /**
   * Draws the JPiece at 90-degree rotation.
   */
  private drawJPieceAt90DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      thirdHeight
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(this.xCoordinates, this.yCoordinates + thirdHeight);
    this._canvas!.lineTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );
    this._canvas!.moveTo(
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight
    );
    this._canvas!.lineTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the JPiece at 90-degree rotation.
   */
  private clearJPieceAt90DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      thirdHeight
    );
  }

  /**
   * Draws the JPiece at 180-degree rotation.
   */
  private drawJPieceAt180DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      halfHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight,
      thirdWidth,
      halfHeight
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(this.xCoordinates + thirdWidth, this.yCoordinates);
    this._canvas!.lineTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );
    this._canvas!.moveTo(this.xCoordinates + twoThirdsWidth, this.yCoordinates);
    this._canvas!.lineTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the JPiece at 180-degree rotation.
   */
  private clearJPieceAt180DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      halfHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight,
      thirdWidth,
      halfHeight
    );
  }

  /**
   * Draws the JPiece at 270-degree rotation.
   */
  private drawJPieceAt270DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight,
      halfWidth,
      thirdHeight
    );

    this._canvas!.beginPath();
    this._canvas!.moveTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + thirdHeight
    );
    this._canvas!.moveTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight
    );
    this._canvas!.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + twoThirdsHeight
    );
    this._canvas!.stroke();
  }

  /**
   * Clears the JPiece at 270-degree rotation.
   */
  private clearJPieceAt270DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    this.clearPieceAndBorder(
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight,
      halfWidth,
      thirdHeight
    );
  }
}
