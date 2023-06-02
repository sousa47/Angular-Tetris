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
switch(key) {
  case 'a':
    this.movePieceLeft();
    break;
  case 's':
    this.movePieceDown();
    break;
  case 'd':
    this.movePieceRight();
    break;
  case 'e':
    this.rotatePiece();
    break;
  case 'w':
    this.movePieceDownhardDrop();
    break;
  case 'f':
    this.holdCurrentPiece();
    break;
}
```

This is how basically the `Record` looks like as a `switch` statement, I used because it does "clog" the code as much as a `switch` statement does, and it is easier to manipulate.

