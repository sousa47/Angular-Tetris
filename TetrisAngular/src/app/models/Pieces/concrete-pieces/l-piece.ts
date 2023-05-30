import { TetrisPiece, RotationDegree } from '../tetris-piece';

/**
 * Represents the L-shaped Tetris piece.
 * Extends the base TetrisPiece class.
 */
export class LPiece extends TetrisPiece {
  /**
   * Object containing the logic functions for drawing the piece based on rotation degree.
   */
  private rotationDrawPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.drawLPieceAt0DegreeRotation.bind(this),
    [90]: this.drawLPieceAt90DegreeRotation.bind(this),
    [180]: this.drawLPieceAt180DegreeRotation.bind(this),
    [270]: this.drawLPieceAt270DegreeRotation.bind(this),
  };

  /**
   * Object containing the logic functions for clear the piece based on rotation degree.
   */
  private rotationClearPieceLogic: Record<RotationDegree, () => void> = {
    [0]: this.clearLPieceAt0DegreeRotation.bind(this),
    [90]: this.clearLPieceAt90DegreeRotation.bind(this),
    [180]: this.clearLPieceAt180DegreeRotation.bind(this),
    [270]: this.clearLPieceAt270DegreeRotation.bind(this),
  };

  /**
   * Creates a new L-shaped Tetris piece.
   * @param {number} xCoordinates - The initial x-coordinate of the piece.
   * @param {number} yCoordinates - The initial y-coordinate of the piece.
   * @param {string} [color='orange'] - The color of the piece. Defaults to 'orange'.
   * @param {CanvasRenderingContext2D | null} [canvas=null] - The canvas rendering context. Defaults to null.
   */
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'orange',
    canvas: CanvasRenderingContext2D | null = null
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = 0;
  }

  /**
   * Draws the LPiece on the canvas.
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
   * Clears the previous position of the LPiece on the canvas.
   */
  public override clearPiecePreviousPosition(): void {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) rotationLogicFunction();
  }

  /**
   * Rotates the LPiece and redraws it on the canvas.
   * @returns {CanvasRenderingContext2D} The rendering context of the canvas.
   */
  override rotatePiece(): CanvasRenderingContext2D {
    this.clearPiecePreviousPosition();

    const halfHeight = this._pieceHeight / 2;
    const thirdHeight = this._pieceHeight / 3;
    
    const halfWidth = this._pieceWidth / 2;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        newXCoordinates -= halfHeight;
        this._rotationDegree = 90;
        break;
      case 90:
        newXCoordinates -= this._pieceHeight / 3;
        newYCoordinates += halfWidth;
        this._rotationDegree = 180;
        break;
      case 180:
        newYCoordinates -= halfHeight;
        this._rotationDegree = 270;
        break;
      case 270:
        newXCoordinates += this._pieceHeight * (2 / 3);
        this._rotationDegree = 0;
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
