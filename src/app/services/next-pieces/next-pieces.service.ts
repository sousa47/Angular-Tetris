import { Injectable } from '@angular/core';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceObjectService } from '../tetris-piece/tetris-piece-object/tetris-piece-object.service';

@Injectable({
  providedIn: 'root',
})
export class NextPiecesService {
  private nextPiecesImageSources: string[] = [];

  constructor(
    private _observableTetrisPieceService: ObservableTetrisPieceService,
    private _tetrisPieeceObjectService: TetrisPieceObjectService
  ) {
    _observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
      (piece: TetrisPiece | null) => {
        if (piece === null) this.setNextPiece();
      }
    );
  }

  public get nextPiecesImageSourceArray(): string[] {
    return this.nextPiecesImageSources.map((piece) => `${piece}_image.png`);
  }

  public setFirstNextPieces(): void {
    for (let i = 0; i < 4; i++) {
      this.nextPiecesImageSources.push(
        `../assets/images/${this.randomPiece()}`
      );
    }
  }

  public setNextPiece(): string {
    const nextPieceImageSource: string = this.nextPiecesImageSources.shift()!;
    const nextPiece = this.randomPiece();
    this.nextPiecesImageSources.push(`../assets/images/${nextPiece}`);
    return nextPiece;
  }

  private randomPiece(): string {
    const randomNumber: number = Math.floor(Math.random() * 7);
    switch (randomNumber) {
      case 0:
        return 'IPiece';
      case 1:
        return 'JPiece';
      case 2:
        return 'LPiece';
      case 3:
        return 'OPiece';
      case 4:
        return 'SPiece';
      case 5:
        return 'TPiece';
      case 6:
        return 'ZPiece';
      default:
        throw new Error('Random number is not valid');
    }
  }
}
