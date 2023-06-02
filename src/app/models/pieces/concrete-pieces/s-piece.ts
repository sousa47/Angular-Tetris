import { Canvas } from '../../canvas';
import { RotationDegree, TetrisPiece } from '../tetris-piece';

export class SPiece extends TetrisPiece {
  constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'green',
    canvas: Canvas
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  override drawPiece(
    context: CanvasRenderingContext2D,
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    context.fillStyle = this._pieceColor;

    const rotationLogicFunction =
      this.rotationDrawPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) context = rotationLogicFunction(context);

    return context;
  }

  public override clearPiecePreviousPosition(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const rotationLogicFunction =
      this.rotationClearPieceLogic[this._rotationDegree];
    if (rotationLogicFunction) context = rotationLogicFunction(context);
    return context;
  }

  public override rotatePiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    context = this.clearPiecePreviousPosition(context);

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
    return this.drawPiece(context, this._pieceWidth, this._pieceHeight);
  }

  public override canMoveToCoordinates(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const rotationLogicFunction = this.movePieceLogic[this._rotationDegree];
    if (rotationLogicFunction)
      return rotationLogicFunction(xCoordinates, yCoordinates);
    return false;
  }

  public override setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasHeight = this._canvas.height;

    this.checkRotationNewXCoordinates(newXCoordinates);

    if (newYCoordinates < this._canvas!.gridUnit * -2 ) newYCoordinates = this._canvas!.gridUnit * -2 ;
    if (newYCoordinates > canvasHeight - this._pieceHeight)
      newYCoordinates = canvasHeight - this._pieceHeight;

    this.yCoordinates = newYCoordinates;
  }

  private drawSPieceAt00Or180DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates + thirdWidth,
      this.yCoordinates,
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates - thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this.xCoordinates,
      this.yCoordinates + this._pieceHeight
    );

    return context;
  }

  private clearSPieceAt0Or180DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      twoThirdsWidth,
      this._pieceHeight
    );
    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates - thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      this._pieceHeight
    );

    return context;
  }

  private drawSPieceAt90Or270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const twoThirdsHeight = (this._pieceHeight * 2) / 3;
    const thirdHeight = this._pieceHeight / 3;

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates,
      this.yCoordinates + thirdHeight,
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight,
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + twoThirdsHeight
    );

    return context;
  }

  private clearSPieceAt90Or270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const twoThirdsHeight = (this._pieceHeight * 2) / 3;
    const thirdHeight = this._pieceHeight / 3;

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      twoThirdsHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight,
      this._pieceWidth,
      twoThirdsHeight
    );

    return context;
  }

  private checkRotationNewXCoordinates(newXCoordinates: number): void {
    const canvasWidth = this._canvas.canvas.width;

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

  private moveIsPossibleAt00Or180DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const thirdWidth = this._pieceWidth / 3;
    return (
      xCoordinates - thirdWidth >= 0 &&
      xCoordinates - thirdWidth <= this._canvas.width - this._pieceWidth &&
      yCoordinates >= this._canvas!.gridUnit * -2  &&
      yCoordinates <= this._canvas.height - this._pieceHeight
    );
  }

  private moveIsPossibleAt90Or270DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const thirdWidth = this._pieceWidth / 3;
    return (
      xCoordinates >= 0 &&
      xCoordinates - thirdWidth <= this._canvas.width - this._pieceWidth &&
      yCoordinates >= this._canvas!.gridUnit * -2  &&
      yCoordinates <= this._canvas.height - this._pieceHeight
    );
  }

  private rotationDrawPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.drawSPieceAt00Or180DegreeRotation.bind(this),
    [180]: this.drawSPieceAt00Or180DegreeRotation.bind(this),
    [90]: this.drawSPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.drawSPieceAt90Or270DegreeRotation.bind(this),
  };

  private rotationClearPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.clearSPieceAt0Or180DegreeRotation.bind(this),
    [180]: this.clearSPieceAt0Or180DegreeRotation.bind(this),
    [90]: this.clearSPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.clearSPieceAt90Or270DegreeRotation.bind(this),
  };

  private movePieceLogic: Record<
    RotationDegree,
    (xCoordinates: number, yCoordinates: number) => boolean
  > = {
    [0]: this.moveIsPossibleAt00Or180DegreeRotation.bind(this),
    [180]: this.moveIsPossibleAt00Or180DegreeRotation.bind(this),
    [90]: this.moveIsPossibleAt90Or270DegreeRotation.bind(this),
    [270]: this.moveIsPossibleAt90Or270DegreeRotation.bind(this),
  };
}
