export class Canvas {
  private readonly _context: CanvasRenderingContext2D | null;

  public constructor(
    private _canvas: HTMLCanvasElement | null,
    private _gridUnit?: number,
    private _xSpawn?: number,
    private _ySpawn?: number
  ) {
    if (_canvas) {
      this._canvas = _canvas;
      this._context = this._canvas.getContext('2d');
      this._context!.fillStyle = 'black';
      this._context!.lineWidth = 2;
      this._context!.strokeStyle = 'black';
      this._canvas.parentElement!.appendChild(this.drawCanvasGrid());
    } else {
      throw new Error('Invalid canvas context. Cannot be null.');
    }
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas!;
  }

  public set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  public get context(): CanvasRenderingContext2D | null {
    const context = this._canvas!.getContext('2d');
    return context;
  }

  public get width(): number {
    return this._context!.canvas.width;
  }

  public get height(): number {
    return this._context!.canvas.height;
  }

  public get gridUnit(): number {
    return this._gridUnit ?? this.width / 10;
  }

  public get xSpawn(): number {
    return this._xSpawn ?? this.width / 2 - this.gridUnit;
  }

  public get ySpawn(): number {
    return this._ySpawn ?? 0;
  }

  private drawCanvasGrid(): Node {
    const step = this.width / 10;

    var canvasGridElement = document.createElement('canvas');
    canvasGridElement.width = this.width;
    canvasGridElement.height = this.height;
    var canvasGrid = canvasGridElement.getContext('2d')!;

    canvasGrid.beginPath();
    for (var x = 0; x <= this.width; x += step) {
      canvasGrid.moveTo(x, 0);
      canvasGrid.lineTo(x, this.height);
    }
    canvasGrid.strokeStyle = 'rgba(20,20,20, 0.2)';
    canvasGrid.lineWidth = 2;
    canvasGrid.stroke();

    canvasGrid.beginPath();
    for (var y = 0; y <= this.height; y += step) {
      canvasGrid.moveTo(0, y);
      canvasGrid.lineTo(this.width, y);
    }
    canvasGrid.strokeStyle = 'rgba(20,20,20, 0.2)';
    canvasGrid.lineWidth = 2;
    canvasGrid.stroke();

    return canvasGridElement;
  }
}
