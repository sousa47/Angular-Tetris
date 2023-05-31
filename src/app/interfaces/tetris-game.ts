import { TetrisPiece } from "../models/pieces/tetris-piece";

export interface TetrisGame {
    score: number;
    linesCleared: number;
    nextPieces: TetrisPiece[];
    currentPiece: TetrisPiece | null;
    holdPiece: TetrisPiece | null;
    generateNextPiece(): void;
    holdCurrentPiece(): void;
    clearLines(lines: number): void;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    restart(): void;

}
