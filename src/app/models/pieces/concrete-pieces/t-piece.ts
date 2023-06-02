import { Canvas } from '../../canvas';
import { RotationDegree, TetrisPiece } from '../tetris-piece';

export class TPiece extends TetrisPiece {
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'purple',
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
    return this.drawPiece(context, this._pieceWidth, this._pieceHeight);
  }

  public override setRotationNewCoordinates(
    newXCoordinates: number,
    newYCoordinates: number
  ): void {
    const canvasHeight = this._canvas!.canvas.height;

    this.checkRotationNewXCoordinates(newXCoordinates);

    if (newYCoordinates < this._canvas!.gridUnit * -2 ) newYCoordinates = this._canvas!.gridUnit * -2 ;
    if (newYCoordinates > canvasHeight - this._pieceWidth)
      newYCoordinates = canvasHeight - this._pieceWidth;

    this.yCoordinates = newYCoordinates;
  }

  private isMiddlePieceUpOrRight(): boolean {
    return this._rotationDegree === 0 || this._rotationDegree === 90;
  }

  private drawHorizontalTPiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    if (this.isMiddlePieceUpOrRight()) {
      context = this.drawPieceAndOuterBorder(
        context,
        this.xCoordinates - halfHeight,
        this.yCoordinates + halfHeight,
        this._pieceWidth,
        halfHeight
      );

      context = this.drawPieceAndOuterBorder(
        context,
        this.xCoordinates,
        this.yCoordinates,
        thirdWidth,
        halfHeight
      );
    } else {
      context = this.drawPieceAndOuterBorder(
        context,
        this.xCoordinates,
        this.yCoordinates,
        this._pieceWidth,
        halfHeight
      );

      context = this.drawPieceAndOuterBorder(
        context,
        this.xCoordinates + halfHeight,
        this.yCoordinates + halfHeight,
        thirdWidth,
        halfHeight
      );
    }

    context = this.drawMiddleSquare(context, true);
    return context;
  }

  private clearHorizontalTPiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfHeight = this._pieceHeight / 2;
    const thirdWidth = this._pieceWidth / 3;

    if (this.isMiddlePieceUpOrRight()) {
      context = this.clearPieceAndBorder(
        context,
        this.xCoordinates - halfHeight,
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
    } else {
      context = this.clearPieceAndBorder(
        context,
        this.xCoordinates,
        this.yCoordinates,
        this._pieceWidth,
        halfHeight
      );

      context = this.clearPieceAndBorder(
        context,
        this.xCoordinates + halfHeight,
        this.yCoordinates + halfHeight,
        thirdWidth,
        halfHeight
      );
    }

    return context;
  }

  private drawVerticalTPiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const middlePieceDirection = this.isMiddlePieceUpOrRight() ? 1 : -1;

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates + halfWidth * middlePieceDirection,
      this.yCoordinates + thirdHeight,
      halfWidth,
      thirdHeight
    );

    context = this.drawMiddleSquare(context, false);
    return context;
  }

  private clearVerticalTPiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const halfWidth = this._pieceWidth / 2;
    const thirdHeight = this._pieceHeight / 3;
    const middlePieceDirection = this.isMiddlePieceUpOrRight() ? 1 : -1;

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      halfWidth,
      this._pieceHeight
    );

    context = this.clearPieceAndBorder(
      context,
      this.xCoordinates + halfWidth * middlePieceDirection,
      this.yCoordinates + thirdHeight,
      halfWidth,
      thirdHeight
    );

    return context;
  }

  private drawMiddleSquare(
    context: CanvasRenderingContext2D,
    horizontalTPiece: boolean
  ): CanvasRenderingContext2D {
    const thirdWidth = this._pieceWidth / 3;
    const thirdHeight = this._pieceHeight / 3;
    const halfHeight = this._pieceHeight / 2;
    const halfWidth = this._pieceWidth / 2;

    if (horizontalTPiece) {
      if (this.isMiddlePieceUpOrRight()) {
        context = this.drawPieceAndOuterBorder(
          context,
          this.xCoordinates,
          this.yCoordinates + halfHeight,
          thirdWidth,
          halfHeight
        );
      } else {
        context = this.drawPieceAndOuterBorder(
          context,
          this.xCoordinates + thirdWidth,
          this.yCoordinates,
          thirdWidth,
          halfHeight
        );
      }
    } else {
      context = this.drawPieceAndOuterBorder(
        context,
        this.xCoordinates,
        this.yCoordinates + halfWidth,
        halfWidth,
        thirdHeight
      );
    }

    return context;
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

  private moveIsPossibleTPieceUp(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(
      xCoordinates - this._pieceWidth / 3,
      yCoordinates
    );
  }

  private moveIsPossibleTPieceDown(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(xCoordinates, yCoordinates);
  }

  private moveIsPossibleTPieceRight(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    return super.canMoveToCoordinates(xCoordinates, yCoordinates);
  }

  private moveIsPossibleTPieceLeft(
    xCoordinates: number,
    yCoordinates: number
  ): boolean {
    const halfWidth = this._pieceWidth / 2;
    return (
      xCoordinates >= halfWidth &&
      xCoordinates <= this._canvas!.canvas.width - halfWidth &&
      yCoordinates >= this._canvas!.gridUnit * -2  &&
      yCoordinates <= this._canvas!.canvas.height - this._pieceHeight
    );
  }

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

  private rotationDrawPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.drawHorizontalTPiece.bind(this),
    [180]: this.drawHorizontalTPiece.bind(this),
    [90]: this.drawVerticalTPiece.bind(this),
    [270]: this.drawVerticalTPiece.bind(this),
  };

  private rotationClearPieceLogic: Record<
    RotationDegree,
    (context: CanvasRenderingContext2D) => CanvasRenderingContext2D
  > = {
    [0]: this.clearHorizontalTPiece.bind(this),
    [180]: this.clearHorizontalTPiece.bind(this),
    [90]: this.clearVerticalTPiece.bind(this),
    [270]: this.clearVerticalTPiece.bind(this),
  };

  private movePieceLogic: Record<
    RotationDegree,
    (xCoordinates: number, yCoordinates: number) => boolean
  > = {
    [0]: this.moveIsPossibleTPieceUp.bind(this),
    [180]: this.moveIsPossibleTPieceDown.bind(this),
    [90]: this.moveIsPossibleTPieceRight.bind(this),
    [270]: this.moveIsPossibleTPieceLeft.bind(this),
  };
}
