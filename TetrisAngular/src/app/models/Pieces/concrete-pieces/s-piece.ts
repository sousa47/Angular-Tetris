import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Class representing an SPiece tetris piece.
 * Extends the TetrisPiece class.
 */
export class SPiece extends TetrisPiece {
  /**
   * Object containing the logic functions for drawing the piece based on rotation degree.
   */
  private rotationDrawPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.drawSPieceAt00Or180DegreeRotation.bind(this),
    [180]: this.drawSPieceAt00Or180DegreeRotation.bind(this),
    [90]: this.drawSPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.drawSPieceAt90Or270DegreeRotation.bind(this),
  };

  /**
   * Object containing the logic functions for clearing the piece based on rotation degree.
   */
  private rotationClearPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.clearSPieceAt0Or180DegreeRotation.bind(this),
    [180]: this.clearSPieceAt0Or180DegreeRotation.bind(this),
    [90]: this.clearSPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.clearSPieceAt90Or270DegreeRotation.bind(this),
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
   * Creates a new S-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='green'] - The color of the piece. Defaults to 'green'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'green',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = 0;
  }

  /**
   * Draws the SPiece on the canvas.
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
    this._canvas!.fillStyle = this._pieceColor;

    const rotationLogicFunction =
      this.rotationDrawPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();

    return this._canvas!;
  }

  /**
   * Clears the previous position of the SPiece on the canvas.
   */
  override clearPiecePreviousPosition(): void {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();
  }

  /**
   * Rotates the SPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    const halfHeight = this._pieceHeight / 2;
    const halfWidth = this._pieceWidth / 2;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        this._rotationDegree = 90;
        break;
      case 90:
        newYCoordinates += halfWidth;
        this._rotationDegree = 180;
        break;
      case 180:
        newXCoordinates -= halfHeight;
        newYCoordinates -= halfHeight;
        this._rotationDegree = 270;
        break;
      case 270:
        newXCoordinates += halfWidth;
        this._rotationDegree = 0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(this._pieceWidth, this._pieceHeight);
  }

  /**
   * Draws the SPiece at 0-degree or 180-degree rotation.
   */
  private drawSPieceAt00Or180DegreeRotation(): void {
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
      this.xCoordinates - thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight
    );
  }

  /**
   * Clears the SPiece at 0-degree or 180-degree rotation.
   */
  private clearSPieceAt0Or180DegreeRotation(): void {
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
      this.xCoordinates - thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      this._pieceHeight
    );
  }

  /**
   * Draws the SPiece at 90-degree or 270-degree rotation.
   */
  private drawSPieceAt90Or270DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const twoThirdsHeight = (this._pieceHeight * 2) / 3;
    const thirdHeight = this._pieceHeight / 3;

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
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight,
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + twoThirdsHeight
    );
  }

  /**
   * Clears the SPiece at 90-degree or 270-degree rotation.
   */
  private clearSPieceAt90Or270DegreeRotation(): void {
    const halfWidth = this._pieceWidth / 2;
    const twoThirdsHeight = (this._pieceHeight * 2) / 3;
    const thirdHeight = this._pieceHeight / 3;

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      twoThirdsHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates + halfWidth,
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
  override canMoveToCoordinates(
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
  override setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasHeight = this._canvas!.canvas.height;

    this.checkRotationNewXCoordinates(newXCoordinates);

    if (newYCoordinates < 0) newYCoordinates = 0;
    if (newYCoordinates > canvasHeight - this._pieceHeight)
      newYCoordinates = canvasHeight - this._pieceHeight;

    this.yCoordinates = newYCoordinates;
  }

  /**
   * Checks and adjusts the new X coordinates after rotation.
   * @param newXCoordinates - The new X coordinates.
   */
  private checkRotationNewXCoordinates(newXCoordinates: number): void {
    const canvasWidth = this._canvas!.canvas.width;

    if (this._rotationDegree === 90 || this._rotationDegree === 270) {
      if (newXCoordinates < 0) newXCoordinates = 0;
      if (newXCoordinates > canvasWidth - this._pieceWidth)
        newXCoordinates = canvasWidth - this._pieceWidth;
    } else {
      const twoThirdsWidth = this._pieceWidth * (2 / 3);
      const fiveSixthsWidth = this._pieceWidth * (5 / 6);
      if (newXCoordinates < twoThirdsWidth) newXCoordinates = fiveSixthsWidth;
      if (newXCoordinates > canvasWidth - twoThirdsWidth)
        newXCoordinates = canvasWidth - this._pieceWidth;
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
    const thirdWidth = this._pieceWidth / 3;
    return (
      xCoordinates - thirdWidth >= 0 &&
      xCoordinates - thirdWidth <=
        this._canvas!.canvas.width - this._pieceWidth &&
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
    const thirdWidth = this._pieceWidth / 3;
    return (
      xCoordinates >= 0 &&
      xCoordinates - thirdWidth <=
        this._canvas!.canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }
}
