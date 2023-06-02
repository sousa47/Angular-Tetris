import { Injectable } from '@angular/core';
import { ObservableTetrisPieceService } from '../observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceDrawingService } from '../tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';

@Injectable({
  providedIn: 'root',
})
export class NextPiecesService {
  private nextPiecesImageSources: string[] = [];

  public constructor(
    private _observableTetrisPieceService: ObservableTetrisPieceService,
    private __tetrisPieceDrawingService: TetrisPieceDrawingService
  ) {}

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
    this.setNextPieceLogic[nextPiece]();
    return nextPiece;
  }

  private randomPiece(): string {
    // To changes odds of certain pieces, change the number in the Math.random() * 7
    const randomNumber: number = 2 // Math.floor(Math.random() * 7);
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

  private setNextPieceLogic: Record<string, () => void> = {
    ['IPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.IPiece),
    ['JPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.JPiece),
    ['LPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.LPiece),
    ['OPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.OPiece),
    ['SPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.SPiece),
    ['TPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.TPiece),
    ['ZPiece']: () =>
      (this._observableTetrisPieceService.currentTetrisPiece =
        this.__tetrisPieceDrawingService.tetrisPieceObjectService.ZPiece),
  };
}
