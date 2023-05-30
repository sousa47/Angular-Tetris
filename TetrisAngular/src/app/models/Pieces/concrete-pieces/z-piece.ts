import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Class representing an ZPiece tetris piece.
 * Extends the TetrisPiece class.
 */
export class ZPiece extends TetrisPiece {
  /**
   * Object containing the logic functions for drawing the piece based on rotation degree.
   */
  private rotationDrawPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.drawZPieceAt00Or180DegreeRotation.bind(this),
    [180]: this.drawZPieceAt00Or180DegreeRotation.bind(this),
    [90]: this.drawZPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.drawZPieceAt90Or270DegreeRotation.bind(this),
  };

  /**
   * Object containing the logic functions for clearing the piece based on rotation degree.
   */
  private rotationClearPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.clearZPieceAt0Or180DegreeRotation.bind(this),
    [180]: this.clearZPieceAt0Or180DegreeRotation.bind(this),
    [90]: this.clearZPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.clearZPieceAt90Or270DegreeRotation.bind(this),
  };

  /**
   * Object containing the logic functions for checking if the piece can be moved based on rotation degree.
   */
  private movePieceLogic: Record<
    RotationDegree,
    (xCoordinates: number, yCoordinates: number) => boolean
  > = {
    [0]: this.moveIsPossibleAt00Or180DegreeRotation.bind(this),
    [180]: this.moveIsPossibleAt00Or180DegreeRotation.bind(this),
    [90]: this.moveIsPossibleAt90Or270DegreeRotation.bind(this),
    [270]: this.moveIsPossibleAt90Or270DegreeRotation.bind(this),
  };

  /**
   * Creates a new Z-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='red'] - The color of the piece. Defaults to 'red'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'red',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = 0;
  }

  /**
   * Draws the ZPiece on the canvas.
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
   * Clears the previous position of the ZPiece on the canvas.
   */
  public override clearPiecePreviousPosition(): void {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();
  }

  /**
   * Rotates the ZPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  public override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    const halfWidth = this._pieceWidth / 2;
    const halfHeight = this._pieceHeight / 2;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        newXCoordinates += this._pieceHeight;
        this._rotationDegree = 90;
        break;
      case 90:
        newXCoordinates -= this._pieceWidth;
        newYCoordinates += halfWidth;
        this._rotationDegree = 180;
        break;
      case 180:
        newXCoordinates += halfHeight;
        newYCoordinates -= halfHeight;
        this._rotationDegree = 270;
        break;
      case 270:
        newXCoordinates -= halfWidth;
        this._rotationDegree = 0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }

  /**
   * Draws the ZPiece at 0-degree or 180-degree rotation.
   */
  private drawZPieceAt00Or180DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates + thirdWidth,
      this.yCoordinates,
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates + this._pieceHeight,
      this.yCoordinates + halfHeight,
      this.xCoordinates + this._pieceHeight,
      this.yCoordinates + this._pieceHeight
    );
  }

  /**
   * Clears the ZPiece at 0-degree or 180-degree rotation.
   */
  private clearZPieceAt0Or180DegreeRotation(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      twoThirdsWidth,
      this._pieceHeight
    );
    this.clearPieceAndBorder(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      this._pieceHeight
    );
  }

  /**
   * Draws the ZPiece at 90-degree or 270-degree rotation.
   */
  private drawZPieceAt90Or270DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates,
      this.yCoordinates + thirdHeight,
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates - halfWidth,
      this.yCoordinates + thirdHeight,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates - halfWidth,
      this.yCoordinates + twoThirdsHeight,
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight
    );
  }

  /**
   * Clears the ZPiece at 90-degree or 270-degree rotation.
   */
  private clearZPieceAt90Or270DegreeRotation(): void {
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      twoThirdsHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates - this._pieceWidth / 2,
      this.yCoordinates + thirdHeight,
      this._pieceWidth,
      twoThirdsHeight
    );
  }

  /**
   * Adjusts the new rotation coordinates to ensure they are within the canvas boundaries.
   * @param newXCoordinates - The new x-coordinate after rotation.
   * @param newYCoordinates - The new y-coordinate after rotation.
   * @returns True if the move is possible, false otherwise.
   */
  public override canMoveToCoordinates(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const rotationLogicFunction = this.movePieceLogic[this._rotationDegree];
    if (rotationLogicFunction)
      return rotationLogicFunction(xCoordinates, yCoordinates);
    return false;
  }

  /**
   * Sets the new coordinates after rotation and adjusts them if necessary.
   * @param newXCoordinates - The new X coordinates.
   * @param newYCoordinates - The new Y coordinates.
   */
  public override setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasHeight = this._canvas!.canvas.height;

    this.checkRotationNewXCoordinates(newXCoordinates);

    if (newYCoordinates < 0) newYCoordinates = 0;
    if (newYCoordinates > canvasHeight - this._pieceWidth)
      newYCoordinates = canvasHeight - this._pieceWidth;

    this.yCoordinates = newYCoordinates;
  }

  /**
   * Checks and adjusts the new X coordinates after rotation.
   * @param newXCoordinates - The new X coordinates.
   */
  private checkRotationNewXCoordinates(newXCoordinates: number): void {
    const canvasWidth = this._canvas!.canvas.width;
    const halfWidth = this._pieceWidth / 2;

    if (this._rotationDegree === 0 || this._rotationDegree === 180) {
      if (newXCoordinates < 0) newXCoordinates = 0;
      if (newXCoordinates > canvasWidth - this._pieceHeight)
        newXCoordinates = canvasWidth - this._pieceHeight;
    } else {
      if (newXCoordinates < halfWidth) newXCoordinates = halfWidth * (2 / 3);
      if (newXCoordinates > canvasWidth - halfWidth)
        newXCoordinates = canvasWidth - halfWidth * (2 / 3);
    }

    this.xCoordinates = newXCoordinates;
  }

  /**
   * Checks if moving the piece is possible at 0 or 180 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleAt00Or180DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return (
      xCoordinates >= 0 &&
      xCoordinates <= this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }

  /**
   * Checks if moving the piece is possible at 90 or 270 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleAt90Or270DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const halfWidth = this._pieceWidth / 2;

    return (
      xCoordinates >= halfWidth &&
      xCoordinates - halfWidth <=
        this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }
}
