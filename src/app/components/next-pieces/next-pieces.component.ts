import { Component } from '@angular/core';
import { NextPiecesService } from 'src/app/services/next-pieces/next-pieces.service';
import { ObservableTetrisPieceService } from 'src/app/services/observable-tetris-piece/observable-tetris-piece.service';

@Component({
  selector: 'app-next-pieces',
  templateUrl: './next-pieces.component.html',
  styleUrls: ['./next-pieces.component.css'],
})
export class NextPiecesComponent {
  public nextPiecesImageSourceArray: string[] | undefined;
  private _firstPiece: boolean = true;

  public constructor(
    _observableTetrisPieceService: ObservableTetrisPieceService,
    _nextPiecesService: NextPiecesService
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
          _nextPiecesService.setNextPiece();
          this.nextPiecesImageSourceArray =
            _nextPiecesService.nextPiecesImageSourceArray;
        }
      }
    );
  }
}
