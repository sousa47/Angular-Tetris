import { TetrisPiece } from "../models/Pieces/tetris-piece";

export interface TetrisGame {
    canvas: HTMLCanvasElement;
    score: number;
    linesCleared: number;
    nextPieces: TetrisPiece[];
    currentPiece: TetrisPiece;
    holdPiece: TetrisPiece;
    generateNextPiece(): void;
    holdCurrentPiece(): void;
    clearLines(lines: number): void;
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    restart(): void;

}
