import { Injectable } from '@angular/core';
import { TetrisPiece } from 'src/app/models/pieces/tetris-piece';
import { TetrisPieceObjectService } from '../tetris-piece-object/tetris-piece-object.service';

@Injectable({
  providedIn: 'root',
})
export class TetrisPieceDrawingService {
  constructor(public tetrisPieceObjectService: TetrisPieceObjectService) {}

  public getPieceDrawing(
    context: CanvasRenderingContext2D,
    tetrisPiece: TetrisPiece
  ): CanvasRenderingContext2D {
    switch (tetrisPiece.constructor.name) {
      case 'IPiece':
        return this.iPieceDrawing(context);
      case 'JPiece':
        return this.jPieceDrawing(context);
      case 'LPiece':
        return this.lPieceDrawing(context);
      case 'OPiece':
        return this.oPieceDrawing(context);
      case 'SPiece':
        return this.sPieceDrawing(context);
      case 'TPiece':
        return this.tPieceDrawing(context);
      case 'ZPiece':
        return this.zPieceDrawing(context);
      default:
        throw new Error("Piece is not a valid piece, couldn't get drawing");
    }
  }

  public iPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    const numberOfSections = 4;
    return this.tetrisPieceObjectService.IPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * numberOfSections,
      this.tetrisPieceObjectService.getCanvas.gridUnit
    );
  }

  public jPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.JPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 3
    );
  }

  public lPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.LPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 3
    );
  }

  public oPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.OPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2
    );
  }

  public sPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.SPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 3
    );
  }

  public tPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.TPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 3
    );
  }

  public zPieceDrawing(
    context: CanvasRenderingContext2D
  ): CanvasRenderingContext2D {
    return this.tetrisPieceObjectService.ZPiece.drawPiece(
      context,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 2,
      this.tetrisPieceObjectService.getCanvas.gridUnit * 3
    );
  }
}
