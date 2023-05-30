import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Class representing an TPiece tetris piece.
 * Extends the TetrisPiece class.
 */
export class TPiece extends TetrisPiece {
  /**
   * Object containing the logic functions for drawing the piece based on rotation degree.
   */
  private rotationDrawPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.drawHorizontalTPiece.bind(this),
    [180]: this.drawHorizontalTPiece.bind(this),
    [90]: this.drawVerticalTPiece.bind(this),
    [270]: this.drawVerticalTPiece.bind(this),
  };

  /**
   * Object containing the logic functions for clearing the piece based on rotation degree.
   */
  private rotationClearPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.clearHorizontalTPiece.bind(this),
    [180]: this.clearHorizontalTPiece.bind(this),
    [90]: this.clearVerticalTPiece.bind(this),
    [270]: this.clearVerticalTPiece.bind(this),
  };

  /**
   * Object containing the logic functions for checking if the piece can be moved based on rotation degree.
   */
  private movePieceLogic: Record<
    RotationDegree,
    (xCoordinates: number, yCoordinates: number) => boolean
  > = {
    [0]: this.moveIsPossibleTPieceUp.bind(this),
    [180]: this.moveIsPossibleTPieceDown.bind(this),
    [90]: this.moveIsPossibleTPieceRight.bind(this),
    [270]: this.moveIsPossibleTPieceLeft.bind(this),
  };

  /**
   * Creates a new T-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='purple'] - The color of the piece. Defaults to 'purple'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'purple',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = 0;
  }

  /**
   * Draws the TPiece on the canvas.
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
   * Clears the previous position of the TPiece on the canvas.
   */
  public override clearPiecePreviousPosition(): void {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();
  }

  /**
   * Verifies if the middle piece is up or right.
   * @returns {boolean} True if the middle piece is up or right, false otherwise.
   */
  private isMiddlePieceUpOrRight(): boolean {
    return this._rotationDegree === 0 || this._rotationDegree === 90;
  }

  /**
   * Rotates the TPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  public override rotatePiece(): CanvasRenderingContext2D {
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
        newXCoordinates -= halfWidth;
        newYCoordinates += halfWidth;
        this._rotationDegree = 180;
        break;
      case 180:
        newXCoordinates += halfHeight;
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
   * Draw the TPiece on the canvas when its horizontal.
   */
  private drawHorizontalTPiece(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    if (this.isMiddlePieceUpOrRight()) {
      this.drawPieceAndOuterBorder(
        this.xCoordinates - halfHeight,
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
    } else {
      this.drawPieceAndOuterBorder(
        this.xCoordinates,
        this.yCoordinates,
        this._pieceWidth,
        halfHeight
      );

      this.drawPieceAndOuterBorder(
        this.xCoordinates + halfHeight,
        this.yCoordinates + halfHeight,
        thirdWidth,
        halfHeight
      );
    }

    this.drawMiddleSquare(true);
  }

  /**
   * Clears the horizontal TPiece from the canvas. Including the extremity piece.
   */
  private clearHorizontalTPiece(): void {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    if (this.isMiddlePieceUpOrRight()) {
      this.clearPieceAndBorder(
        this.xCoordinates - halfHeight,
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
    } else {
      this.clearPieceAndBorder(
        this.xCoordinates,
        this.yCoordinates,
        this._pieceWidth,
        halfHeight
      );

      this.clearPieceAndBorder(
        this.xCoordinates + halfHeight,
        this.yCoordinates + halfHeight,
        thirdWidth,
        halfHeight
      );
    }
  }

  /**
   * Draw the TPiece on the canvas when its vertical.
   */
  private drawVerticalTPiece(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const middlePieceDirection = this.isMiddlePieceUpOrRight() ? 1 : -1;

    this.drawPieceAndOuterBorder(
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.drawPieceAndOuterBorder(
      this.xCoordinates + halfWidth * middlePieceDirection,
      this.yCoordinates + thirdHeight,
      halfWidth,
      thirdHeight
    );

    this.drawMiddleSquare(false);
  }

  /**
   * Clears the vertical TPiece from the canvas. Including the extremity piece.
   */
  private clearVerticalTPiece(): void {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const middlePieceDirection = this.isMiddlePieceUpOrRight() ? 1 : -1;

    this.clearPieceAndBorder(
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    this.clearPieceAndBorder(
      this.xCoordinates + halfWidth * middlePieceDirection,
      this.yCoordinates + thirdHeight,
      halfWidth,
      thirdHeight
    );
  }

  /**
   * Draws the middle square of the TPiece.
   * @param horizontalTPiece True if the middle piece is horizontal, false otherwise.
   */
  private drawMiddleSquare(horizontalTPiece: boolean): void {
    const thirdWidth = this._pieceWidth / 3;
    const thirdHeight = this._pieceHeight / 3;
    const halfHeight = this._pieceHeight / 2;
    const halfWidth = this._pieceWidth / 2;

    if (horizontalTPiece) {
      if (this.isMiddlePieceUpOrRight()) {
        this.drawPieceAndOuterBorder(
          this.xCoordinates,
          this.yCoordinates + halfHeight,
          thirdWidth,
          halfHeight
        );
      } else {
        this.drawPieceAndOuterBorder(
          this.xCoordinates + thirdWidth,
          this.yCoordinates,
          thirdWidth,
          halfHeight
        );
      }
    } else {
      this.drawPieceAndOuterBorder(
        this.xCoordinates,
        this.yCoordinates + halfWidth,
        halfWidth,
        thirdHeight
      );
    }
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
   * Checks if moving the piece is possible at 0 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleTPieceUp(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(
      xCoordinates - this._pieceWidth / 3,
      yCoordinates
    );
  }

  /**
   * Checks if moving the piece is possible at 90 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleTPieceDown(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(xCoordinates, yCoordinates);
  }

  /**
   * Checks if moving the piece is possible at 180 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleTPieceRight(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(xCoordinates, yCoordinates);
  }

  /**
   * Checks if moving the piece is possible at 270 degree rotation.
   * @param xCoordinates - The X coordinates to check.
   * @param yCoordinates - The Y coordinates to check.
   * @returns True if the move is possible, false otherwise.
   */
  private moveIsPossibleTPieceLeft(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const halfWidth = this._pieceWidth / 2;
    return (
      xCoordinates >= halfWidth &&
      xCoordinates <= this._canvas!.canvas.width - halfWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
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
    const halfWidth = this._pieceWidth / 2;
    const thirdWidth = this._pieceWidth / 3;

    switch (this._rotationDegree) {
      case 0:
        if (newXCoordinates < thirdWidth) newXCoordinates = thirdWidth;
        if (newXCoordinates > this._canvas!.canvas.width - this._pieceWidth)
          newXCoordinates = this._canvas!.canvas.width - this._pieceWidth;
        break;
      case 90:
        if (newXCoordinates < 0) newXCoordinates = 0;
        if (newXCoordinates > this._canvas!.canvas.width - halfWidth)
          newXCoordinates = this._canvas!.canvas.width - halfWidth * (2 / 3);
        break;
      case 180:
        if (newXCoordinates < 0) newXCoordinates = 0;
        if (newXCoordinates > this._canvas!.canvas.width - this._pieceWidth)
          newXCoordinates = this._canvas!.canvas.width - this._pieceWidth;
        break;
      case 270:
        if (newXCoordinates < halfWidth) newXCoordinates = halfWidth * (2 / 3);
        if (newXCoordinates > this._canvas!.canvas.width - halfWidth)
          newXCoordinates = this._canvas!.canvas.width - halfWidth;
    }

    this.xCoordinates = newXCoordinates;
  }
}
