# Angular Tetris Implementation

## Contents

### Introduction

In this document we will go through the implementation of the Angular Tetris game. We will go through the different components and services that make up the game and how they interact with each other. We will do these folder by folder, explaining the folder content and how it is used in the game.
Some pieces of the code will be shown here, which can be found in the `src\app` [folder](../../app/) of the project.

### Components

The project contains 4 components, which are the following:

- `main-game.component.ts` | [Open File](../../app/components/main-game/main-game.component.ts) - The main game component has the main canvas, which is the one in the middle. In this canvas the pieces that the player controls are drawn, as well as the grid and the next piece.
  To detect the keyboard events, the `HostListener` decorator is used, which allows to listen to events on the host element of the component, which in this case is the canvas. The `keydown` event is used to detect when the user presses a key, and the `keyup` event is used to prevent the user from holding down the key and moving the piece too fast. To know which method to be called based on the key pressed, a ``Record` is used, which is basically a `switch statement`. The `Record` is defined as follows:

```typescript
private inputLogic: Record<string, () => void> = {
    ['a']: this.movePieceLeft.bind(this),
    ['s']: this.movePieceDown.bind(this),
    ['d']: this.movePieceRight.bind(this),
    ['e']: this.rotatePiece.bind(this),
    ['w']: this.movePieceDownhardDrop.bind(this),
    ['f']: this.holdCurrentPiece.bind(this),
  };
```

This type of annotation is used all thorough the application, so how does it work?

```typescript
switch (key) {
  case "a":
    this.movePieceLeft();
    break;
  case "s":
    this.movePieceDown();
    break;
  case "d":
    this.movePieceRight();
    break;
  case "e":
    this.rotatePiece();
    break;
  case "w":
    this.movePieceDownhardDrop();
    break;
  case "f":
    this.holdCurrentPiece();
    break;
}
```

This is how basically the `Record` looks like as a `switch` statement, I used because it does not "clog" the code as much as a `switch` statement does, and it is easier to manipulate.
Since we are here, the methods presented here should be self-explanatory, by their names, but how do they make the piece move? Well there's a service for that, which we will see later on, but in general thats how all components work, they listen to events and call methods from services to do the work.

In this case the `main-game.component.ts` component is the more complex one, it could be a little more modularized, but it works as it is. Most of the complexity comes from the fact that the component uses almost all the services, and it is the one that has the most interaction with the user.

The services are called trough the `constructor` of the component, which is the following:

```typescript
public constructor(
  private _tetrisPieceDrawingService: TetrisPieceDrawingService,
  private _observableTetrisPieceService: ObservableTetrisPieceService,
  private _tetrisCollisionService: TetrisCollisionService,
  private _gameService: GameService
) {
    this.setObservableTetrisPieceService();
}
```

In this component at least 4 services are used, which I will enter in more detail later on, but for now, the `constructor` is the place where the services are injected into the component, and the `setObservableTetrisPieceService()` method is called, which is the following:

```typescript
private setObservableTetrisPieceService(): void {
  this._observableTetrisPieceService.currentTetrisPieceSubject.subscribe(
    (currentPiece: TetrisPiece | null) => {
      if (currentPiece === null || currentPiece === undefined) return;
        this._currentPiece = currentPiece;
        this.drawPiece();
      }
  );

  this._observableTetrisPieceService.startGameSubject.subscribe(
    (value: boolean) => {
      if (value) {
        this.startGameLoop();
        this._currentPiece?.clearCanvas();
        this._tetrisCollisionService.setTetrisBoard();
      }
    }
  );

  this._observableTetrisPieceService.linesClearedSubject.subscribe(
    (value: number[]) => this.clearLines(value)
  );
}
```

It basically prepares the `ObservableTetrisPieceService` to be used. Everytime we want to `observe` a property this annotation is used.

For the pieces movement the `TetrisCollisionService` and the `TetrisPieceDrawingService` are used, the first one is for detecting pieces collisions, the latter is to draw the pieces on the canvas. Let's see how the `movePieceRight()` method works:

```typescript
public movePieceRight(): void {
    if (this.checkCollision('right')) return;
    this._currentPiece!.movePieceRight(this._canvasContext!) || null;
}

private checkCollision(direction: 'down' | 'left' | 'right'): boolean {
    return this._tetrisCollisionService.checkCollision(
      this._currentPiece?.xCoordinates!,
      this._currentPiece?.yCoordinates!,
      direction,
      this._currentPiece!
    );
}
```

As we can see, the component does do much, it simply calls for the services to do the work, and the services do the work. The `movePieceRight()` method calls the `checkCollision()` method, which is the one that checks if the piece can move to the right, if it can, then the `movePieceRight()` method from the `TetrisPiece` class is called, which is the one that actually moves the piece to the right.

In case the piece cannot move to the right, the `checkCollision()` method returns `true`, and the `movePieceRight()` method returns `null`, which means that the piece cannot move to the right, ignoring the user input.

The remaining methods work in a similar way, so I will not go into detail about them.

There's a few more methods in this component which are worth going into detail, which are the following:

```typescript
public ngAfterViewInit(): void {
    this._canvasContext = this.canvas.nativeElement.getContext('2d');
    this._canvas = new Canvas(
      this.canvas.nativeElement,
      undefined,
      undefined,
      -40
    );
    this._tetrisPieceDrawingService.tetrisPieceObjectService.canvas =
      this._canvas;

    this._tetrisCollisionService.gridScale = this._canvas.gridUnit;
    this._canvasGridUnit = this._canvas.gridUnit;
}
```

The `ngAfterViewInit()` method is called after the view is initialized, and it is used to initialize the canvas, and set the `gridScale` property of the `TetrisCollisionService`, which is used to calculate the collisions. The `-40` is an attempt to make piece spawn a bit higher, so that the user has more time to react. In the other components the `ngAfterViewInit()` method is also used to initialize the canvas and other properties, since we only want them to be initialized after the view is initialized.

The following method is to hold the current piece, which could be one of the methods to improve the modularity of the component, but it works as it is:

```typescript
  public holdCurrentPiece(): void {
    if (!this._canHoldPiece || !this._currentPiece) return;

    const holdenPiece = this._observableTetrisPieceService.holdenTetrisPiece;
    this._observableTetrisPieceService.holdenTetrisPiece = this._currentPiece!;
    this._canHoldPiece = false;

    if (holdenPiece) {
      this._currentPiece.clearPiecePreviousPosition(this._canvasContext!);
      this._currentPiece = holdenPiece;
      this.drawPiece();
    } else {
      this.nextPiece(false);
    }
  }
```

The `holdCurrentPiece()` method is called when the user presses the `f` key, and it holds the current piece, if possible, since the user can only hold the piece once per new piece. If the user holds the piece, the `holdenTetrisPiece` property of the `ObservableTetrisPieceService` is set to the current piece, and the `canHoldPiece` property of the component is set to `false`, so that the user cannot hold the piece again. If the user has already held a piece, then the current piece is set to the holden piece, and the holden piece is set to the current piece, and the `drawPiece()` method is called, which draws the piece on the canvas.

The `holdenTetrisPiece` is then used in the `hold-piece.component.ts` component.

For the game loop, the `startGameLoop()` and the `endGameLoop()` methods are used, which are the following:

```typescript
private startGameLoop(): void {
  if (this._gameLoopInterval !== undefined) return;

  this._gameLoopInterval = setInterval(() => {
    if (this._currentPiece) this.movePieceDown();

    if (!this.checkIfPieceMoved()) {
      if (this._currentPiece?.yCoordinates == 0) this.endGameLoop();
      this.nextPiece();
    }
  }, this._gameService.gameSpeed);
}

private endGameLoop(): void {
    clearInterval(this._gameLoopInterval);
    this._gameLoopInterval = undefined;
    this._gameService.endGame();
}
```

Both methods should be easy to understand, the method to start the game loop uses a `setInterval()` to create the loop, and the method to end the game loop uses the `clearInterval()` method to stop the loop.

Inside the loop, the `movePieceDown()` method is called, which moves the piece down, and the `checkIfPieceMoved()` method is called, which checks if the piece has moved, and if it hasn't, then the `nextPiece()` method is called, which is the method that spawns the next piece. In case the piece hasn't moved and the `yCoordinates` property of the piece is `0`, then the `endGameLoop()` method is called, which ends the game loop. This is because if the piece hasn't moved and the `yCoordinates` property is `0`, then the piece is at the top of the canvas, and the game should end.

In the `endGameLoop()` method, the `endGame()` method of the `GameService` is called, which is the method that ends the game. The `_gameLoopInterval` property is set to `undefined` so that the game loop can be started again.


Finally, the last method to check is the `clearLines()` method, which is the following:

```typescript
private clearLines(lines: number[]): void {
  const numberOfLines = lines.length;
  for (let i = 0; i < numberOfLines; i++) {
    this._canvasContext?.clearRect(
      0,
      lines[i] * this._canvasGridUnit - 1,
      this._canvasContext.canvas.width,
      this._canvasGridUnit + 2
    );
  }

  this._canvasContext!.save();
  this._canvasContext!.translate(0, this._canvasGridUnit * numberOfLines);
  this._canvasContext!.drawImage(this._canvas?.canvas!, 0, 0);
  this._canvasContext!.restore();

  this._gameService.addScore(numberOfLines * numberOfLines);
}
```

It checks how many lines were cleared, and then it clears the lines, and adds the score to the game. The `clearRect()` method is used to clear the lines, and the `drawImage()` method is used to draw the canvas again, but translated by the number of lines that were cleared, so that the pieces that were above the cleared lines are moved down.

This method is called using one of the observables of the `ObservableTetrisPieceService`, which is the `linesCleared` observable.
