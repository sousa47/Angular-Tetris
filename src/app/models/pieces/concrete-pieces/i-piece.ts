import { Canvas } from '../../canvas';
import { TetrisPiece, RotationDegree } from '../tetris-piece';

export class IPiece extends TetrisPiece {
  private _numberOfSections = 4;

  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'lightblue',
    canvas: Canvas
  ) {
    super(xCoordinates, yCoordinates, color, canvas);
    this._rotationDegree = RotationDegree.Degree90;
  }

  public override drawPiece(
    context: CanvasRenderingContext2D,
    heightLength: number,
    widthLength: number
  ): CanvasRenderingContext2D {
    this._pieceHeight = heightLength;
    this._pieceWidth = widthLength;
    context.fillStyle = this._pieceColor;

    context = this.drawPieceAndOuterBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      widthLength,
      heightLength
    );

    context = this.drawInnerBorder(context);

    return context;
  }

  private drawInnerBorder(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const sectionLength =
      this._rotationDegree % 180 === 0 ? this._pieceWidth : this._pieceHeight;

    // Inner border. (The drawing is all done inside the for loop.)
    for (let i = 1; i < this._numberOfSections; i++) {
      const sectionLineCoordinates =
        this._rotationDegree % 180 === 0
          ? this.xCoordinates + (sectionLength / this._numberOfSections) * i
          : this.yCoordinates + (sectionLength / this._numberOfSections) * i;

      context.beginPath();
      context.moveTo(
        this._rotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates,
        this._rotationDegree % 180 === 0
          ? this.yCoordinates
          : sectionLineCoordinates
      );
      context.lineTo(
        this._rotationDegree % 180 === 0
          ? sectionLineCoordinates
          : this.xCoordinates + this._pieceWidth,
        this._rotationDegree % 180 === 0
          ? this.yCoordinates + this._pieceHeight
          : sectionLineCoordinates
      );
      context.stroke();
    }

    return context;
  }

  public override clearPiecePreviousPosition(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.clearPieceAndBorder(
      context,
      this.xCoordinates,
      this.yCoordinates,
      this._pieceWidth,
      this._pieceHeight
    );
  }

  public override rotatePiece(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    context = this.clearPiecePreviousPosition(context);

    const halfWidth = this._pieceWidth / 2;
    const halfHeight = this._pieceHeight / 2;
    const quarterWidth = this._pieceWidth / 4;
    const quarterHeight = this._pieceHeight / 4;

    let newXCoordinates = this.xCoordinates;
    let newYCoordinates = this.yCoordinates;

    switch (this._rotationDegree) {
      case 0:
        newXCoordinates += quarterWidth;
        newYCoordinates -= halfWidth;
        this._rotationDegree = 90;
        break;
      case 90:
        newXCoordinates -= quarterHeight;
        newYCoordinates += quarterHeight;
        this._rotationDegree = 180;
        break;
      case 180:
        newXCoordinates += halfWidth;
        newYCoordinates -= quarterWidth;
        this._rotationDegree = 270;
        break;
      case 270:
        newXCoordinates -= halfHeight;
        newYCoordinates += halfHeight;
        this._rotationDegree = 0;
        break;
    }

    this.setRotationNewCoordinates(newXCoordinates, newYCoordinates);
    return this.drawPiece(context, this._pieceWidth, this._pieceHeight);
  }
}
