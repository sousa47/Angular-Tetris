import { Component } from '@angular/core';
import { NextPiecesService } from 'src/app/services/next-pieces/next-pieces.service';
import { ObservableTetrisPieceService } from 'src/app/services/observable-tetris-piece/observable-tetris-piece.service';
import { TetrisPieceDrawingService } from 'src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service';

@Component({
  selector: 'app-next-pieces',
  templateUrl: './next-pieces.component.html',
  styleUrls: ['./next-pieces.component.css'],
})
export class NextPiecesComponent {
  public nextPiecesImageSourceArray: string[] | undefined;
  private _firstPiece: boolean = true;

  public constructor(
    private _observableTetrisPieceService: ObservableTetrisPieceService,
    private __tetrisPieceDrawingService: TetrisPieceDrawingService,
    private _nextPiecesService: NextPiecesService
  ) {
    _nextPiecesService.setFirstNextPieces();
    _observableTetrisPieceService.startGameSubject.subscribe(
      (value: boolean) => {
        if (value) {
          this.nextPiecesImageSourceArray =
            _nextPiecesService.nextPiecesImageSourceArray;
        }
      }
    );

    _observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
      (value) => {
        if (this._firstPiece) {
          this._firstPiece = false;
          return;
        }
        
        if (value === null) {
          const nextPiece = _nextPiecesService.setNextPiece();
          this.setNextPieceLogic[nextPiece]();
          this.updateNextPiecesImageSourceArray();
        }
      }
    );
  }

  private updateNextPiecesImageSourceArray(): void {
    this.nextPiecesImageSourceArray = [];

    this._nextPiecesService.nextPiecesImageSourceArray.forEach((value) => {
      this.nextPiecesImageSourceArray!.push(value);
    });
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
