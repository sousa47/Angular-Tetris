import { Injectable } from '@angular/core';
import { TetrisPiece } from 'src/app/models/Pieces/tetris-piece';
import { TetrisPieceObjectService } from '../tetris-piece-object/tetris-piece-object.service';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceDrawingService {



  constructor(public tetrisPieceObjectService: TetrisPieceObjectService) {}

  get randomPieceAndPieceDrawing(): [TetrisPiece, CanvasRenderingContext2D] {
    const randomPiece = this.tetrisPieceObjectService.randomPiece;
    randomPiece.clearCanvas();
    return [randomPiece, this.getPieceDrawing(randomPiece)];
  }

  getPieceDrawing(tetrisPiece: TetrisPiece): CanvasRenderingContext2D {
    switch (tetrisPiece.constructor.name) {
      case 'IPiece':
        return this.iPieceDrawing;
      case 'JPiece':
        return this.jPieceDrawing;
      case 'LPiece':
        return this.lPieceDrawing;
      case 'OPiece':
        return this.oPieceDrawing;
      case 'SPiece':
        return this.sPieceDrawing;
      case 'TPiece':
        return this.tPieceDrawing;
      case 'ZPiece':
        return this.zPieceDrawing;
      default:
        throw new Error("Piece is not a valid piece, couldn't get drawing");
    }
  }

  get iPieceDrawing(): CanvasRenderingContext2D {
    const numberOfSections = 4;
    return this.tetrisPieceObjectService.IPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * numberOfSections,
      this.tetrisPieceObjectService.getCanvas().gridUnit
    );
  }

  get jPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.JPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 3
    );
  }

  get lPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.LPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 3
    );
  }

  get oPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.OPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2
    );
  }

  get sPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.SPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 3
    );
  }

  get tPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.TPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 3
    );
  }

  get zPieceDrawing(): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.ZPiece.drawPiece(
      this.tetrisPieceObjectService.getCanvas().gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas().gridUnit * 3
    );
  }
}
