import { Canvas } from '../../canvas';
import { TetrisPiece, RotationDegree } from '../tetris-piece';

export class JPiece extends TetrisPiece {
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'blue',
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
    return this.drawPiece(context, this._pieceWidth, this._pieceHeight);
  }

  private drawJPieceAt0DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this._pieceWidth,
      halfHeight
    );

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      thirdWidth,
      halfHeight
    );

    context.beginPath();
    context.moveTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );
    context.lineTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + this._pieceHeight
    );
    context.moveTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight
    );
    context.lineTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + this._pieceHeight
    );
    context.stroke();

    return context;
  }

  private clearJPieceAt0DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates + halfHeight,
      this._pieceWidth,
      halfHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      thirdWidth,
      halfHeight
    );

    return context;
  }

  private drawJPieceAt90DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      thirdHeight
    );

    context.beginPath();
    context.moveTo(this.xCoordinates, this.yCoordinates + thirdHeight);
    context.lineTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );
    context.moveTo(this.xCoordinates, this.yCoordinates + twoThirdsHeight);
    context.lineTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight
    );
    context.stroke();

    return context;
  }

  private clearJPieceAt90DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      thirdHeight
    );

    return context;
  }

  private drawJPieceAt180DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      halfHeight
    );

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight,
      thirdWidth,
      halfHeight
    );

    context.beginPath();
    context.moveTo(this.xCoordinates + thirdWidth, this.yCoordinates);
    context.lineTo(
      this.xCoordinates + thirdWidth,
      this.yCoordinates + halfHeight
    );
    context.moveTo(this.xCoordinates + twoThirdsWidth, this.yCoordinates);
    context.lineTo(
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight
    );
    context.stroke();

    return context;
  }

  private clearJPieceAt180DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;
    const twoThirdsWidth = this._pieceWidth * (2 / 3);

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      halfHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates + twoThirdsWidth,
      this.yCoordinates + halfHeight,
      thirdWidth,
      halfHeight
    );

    return context;
  }

  private drawJPieceAt270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.drawPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight,
      halfWidth,
      thirdHeight
    );

    context.beginPath();
    context.moveTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + thirdHeight
    );
    context.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + thirdHeight
    );
    context.moveTo(
      this.xCoordinates + halfWidth,
      this.yCoordinates + twoThirdsHeight
    );
    context.lineTo(
      this.xCoordinates + this._pieceWidth,
      this.yCoordinates + twoThirdsHeight
    );
    context.stroke();

    return context;
  }

  private clearJPieceAt270DegreeRotation(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const twoThirdsHeight = this._pieceHeight * (2 / 3);

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates + halfWidth,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates + twoThirdsHeight,
      halfWidth,
      thirdHeight
    );

    return context;
  }

  private rotationDrawPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.drawJPieceAt0DegreeRotation.bind(this),
    [90]: this.drawJPieceAt90DegreeRotation.bind(this),
    [180]: this.drawJPieceAt180DegreeRotation.bind(this),
    [270]: this.drawJPieceAt270DegreeRotation.bind(this),
  };
  private rotationClearPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.clearJPieceAt0DegreeRotation.bind(this),
    [90]: this.clearJPieceAt90DegreeRotation.bind(this),
    [180]: this.clearJPieceAt180DegreeRotation.bind(this),
    [270]: this.clearJPieceAt270DegreeRotation.bind(this),
  };
}
