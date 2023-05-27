import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TetrisCanvasService {
  private _canvas: CanvasRenderingContext2D | null = null;
  private _canvasWidth: number = 0;
  private _canvasHeight: number = 0;

  setCanvas(canvas: CanvasRenderingContext2D | null): void {
    this._canvas = canvas;
    this._canvasWidth = this._canvas!.canvas.width;
    this._canvasHeight = this._canvas!.canvas.height;
    this._canvas?.canvas.parentElement?.appendChild(this.drawGrid());
  }

  /**
   * Draws a grid on the canvas.
   * Author: https://codereview.stackexchange.com/users/111698/deian
   */
  drawGrid(): Node {
    const step = 20;

    var canvasGridElement = document.createElement('canvas');
    canvasGridElement.width = this._canvasWidth;
    canvasGridElement.height = this._canvasHeight;
    var canvasGrid = canvasGridElement.getContext('2d')!;

    canvasGrid.beginPath();
    for (var x = 0; x <= this._canvasWidth; x += step) {
      canvasGrid.moveTo(x, 0);
      canvasGrid.lineTo(x, this._canvasHeight);
    }
    canvasGrid.strokeStyle = 'rgba(20,20,20, 0.2)';
    canvasGrid.lineWidth = 2;
    canvasGrid.stroke();

    canvasGrid.beginPath();
    for (var y = 0; y <= this._canvasHeight; y += step) {
      canvasGrid.moveTo(0, y);
      canvasGrid.lineTo(this._canvasWidth, y);
    }
    canvasGrid.strokeStyle = 'rgba(20,20,20, 0.2)';
    canvasGrid.lineWidth = 2;
    canvasGrid.stroke();

    return canvasGridElement;
  }

  get canvas(): CanvasRenderingContext2D | null {
    return this._canvas;
  }
}
