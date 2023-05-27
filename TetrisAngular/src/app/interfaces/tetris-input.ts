export interface TetrisInput {
    movement: number;
    rotatePieceClockwise(): void;
    rotatePieceCounterClockwise(): void;
    movePieceDown(allTheWay: boolean): void;
    movePieceLeft(): void;
    movePieceRight(): void;
}
