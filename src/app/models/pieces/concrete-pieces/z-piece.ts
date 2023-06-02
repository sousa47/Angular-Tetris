import { Canvas } from '../../canvas';
import { TetrisPiece, RotationDegree } from '../tetris-piece';

export class ZPiece extends TetrisPiece {
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'red',
    canvas: Canvas
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
  }

  public override drawPiece(
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

    if (newYCoordinates < 0) newYCoordinates = 0;
    if (newYCoordinates > canvasHeight - this._pieceWidth)
      newYCoordinates = canvasHeight - this._pieceWidth;

    this.yCoordinates = newYCoordinates;
  }

  private drawZPieceAt00Or180DegreeRotation(
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
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      halfHeight,
      this.xCoordinates + this._pieceHeight,
      this.yCoordinates + halfHeight,
      this.xCoordinates + this._pieceHeight,
      this.yCoordinates + this._pieceHeight
    );

    return context;
  }

  private clearZPieceAt0Or180DegreeRotation(
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
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight,
      twoThirdsWidth,
      this._pieceHeight
    );

    return context;
  }

  private drawZPieceAt90Or270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

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
      this.xCoordinates - halfWidth,
      this.yCoordinates + thirdHeight,
      halfWidth,
      twoThirdsHeight,
      this.xCoordinates - halfWidth,
      this.yCoordinates + twoThirdsHeight,
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight
    );

    return context;
  }

  private clearZPieceAt90Or270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      twoThirdsHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates - this._pieceWidth / 2,
      this.yCoordinates + thirdHeight,
      this._pieceWidth,
      twoThirdsHeight
    );

    return context;
  }

  private checkRotationNewXCoordinates(newXCoordinates: number): void {
    const canvasWidth = this._canvas.width;
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

  private moveIsPossibleAt00Or180DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return (
      xCoordinates >= 0 &&
      xCoordinates <= this._canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas.height - this._pieceHeight
    );
  }

  private moveIsPossibleAt90Or270DegreeRotation(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const halfWidth = this._pieceWidth / 2;

    return (
      xCoordinates >= halfWidth &&
      xCoordinates - halfWidth <= this._canvas.width - this._pieceWidth &&
      yCoordinates >= 0 &&
      yCoordinates <= this._canvas.height - this._pieceHeight
    );
  }

  private rotationDrawPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.drawZPieceAt00Or180DegreeRotation.bind(this),
    [180]: this.drawZPieceAt00Or180DegreeRotation.bind(this),
    [90]: this.drawZPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.drawZPieceAt90Or270DegreeRotation.bind(this),
  };

  private rotationClearPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.clearZPieceAt0Or180DegreeRotation.bind(this),
    [180]: this.clearZPieceAt0Or180DegreeRotation.bind(this),
    [90]: this.clearZPieceAt90Or270DegreeRotation.bind(this),
    [270]: this.clearZPieceAt90Or270DegreeRotation.bind(this),
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
