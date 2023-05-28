export interface TetrisInput {
    movement: number;
    rotatePieceClockwise(): void;
    movePieceDown(hardDrop: boolean): void;
    movePieceLeft(): void;
    movePieceRight(): void;
}
