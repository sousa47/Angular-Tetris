export interface TetrisInput {
  movement: number;
  rotatePieceClockwise(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D;
  movePieceDown(
    context: CanvasRenderingContext2D,
    hardDrop: boolean
  ): CanvasRenderingContext2D;
  movePieceLeft(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
  movePieceRight(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
}
