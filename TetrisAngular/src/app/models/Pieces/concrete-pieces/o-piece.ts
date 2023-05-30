import { Canvas } from '../../canvas';
import { TetrisPiece } from '../tetris-piece';

export class OPiece extends TetrisPiece {
  public constructor(
    xCoordinates: number,
    yCoordinates: number,
    color: string = 'yellow',
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

    const squareSize = Math.min(this._pieceHeight, this._pieceWidth);
    const squareXCoordinates =
      this.xCoordinates + (this._pieceWidth - squareSize) / 2;
    const squareYCoordinates =
      this.yCoordinates + (this._pieceHeight - squareSize) / 2;

    context = this.drawPieceAndOuterBorder(
      context,
      squareXCoordinates,
      squareYCoordinates,
      squareSize,
      squareSize
    );
    context = this.drawPieceInnerBorders(context);

    return context;
  }

  private drawPieceInnerBorders(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const size = Math.min(this._pieceHeight, this._pieceWidth);
    const halfSize = size / 2;

    // Draw horizontal inner line.
    context.beginPath();
    context.moveTo(this.xCoordinates, this.yCoordinates + halfSize);
    context.lineTo(this.xCoordinates + size, this.yCoordinates + halfSize);
    context.stroke();

    // Draw vertical inner line.
    context.beginPath();
    context.moveTo(this.xCoordinates + halfSize, this.yCoordinates);
    context.lineTo(this.xCoordinates + halfSize, this.yCoordinates + size);
    context.stroke();

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
    // Since this is a square, it doesn't truly rotate.
    return context;
  }
}
