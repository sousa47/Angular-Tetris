import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NextPiecesService {
  private nextPiecesImageSources: string[] = [];

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
    const nextPiece = nextPieceImageSource.split('/images/')[1];
    this.nextPiecesImageSources.push(`../assets/images/${this.randomPiece()}`);
    return nextPiece;
  }

  private randomPiece(): string {
    // To changes odds of certain pieces, change the number in the Math.random() * 7
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
