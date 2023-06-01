# Angular Tetris Documentation

## Index

1. [The Context](#the-context)
2. [How It Was Done](#how-it-was-done)
3. [Implementation Details]

### The Context

The context is simple, create a tetris game using angular.
To do that, I used the **canvas** element from `HTMLCanvasElement`.

Besides of trying to envolve the project using a 3 tier architecture, it endend up being a 2 tier architecture, because there's no need to have a database, since the game is not saving any data.

Those tiers and their respective responsabilities are:

- **Presentation Layer**: The presentation layer is the layer that the user interacts with. It's the layer that the user sees and interacts with. In this case, it's the angular application. In this project those are the components that are inside the `src/app/components` folder | [Open Folder](src/app/components/) |.
- **Business Layer**: The business layer is the layer that contains the business logic. In this case, it's the game logic. In this project, it's the `src/app/services/game.service.ts` file | [Open File](src/app/services/game.service.ts) |.

### How It Was Done

The game was done using the **canvas** element from `HTMLCanvasElement`. The canvas element is a HTML element that can be used to draw graphics using JavaScript. It's a rectangular area on an HTML page. By default, a canvas has no border and no content.

To draw on the canvas element, it requires a **context**. The context is the tool that is used to draw on the canvas. The context can be 2D or 3D. In this case, the context used was the 2D context.

Each piece was drawn using rectangles with the **fillRect** method from the context. The **fillRect** method draws a filled rectangle on the canvas. The **fillRect** method takes four parameters: **x**, **y**, **width**, and **height**. The **x** and **y** parameters specify the position on the canvas (relative to the canvas left top corner) where to place the rectangle. The **width** and **height** parameters specify the size of the rectangle. While drawing the pieces, it was also drawn the inner and outer borders of the pieces.

To auxiliate and simplifly the drawing of the pieces, it was used a service and some model class's. The service is the `src/app/services/game.service.ts` file | [Open File](src/app/services/) |. The model class's are the `src/app/models` folder | [Open Folder](src/app/models/) |.

#### Services and Model Class's to Draw the Pieces

The services used to draw were the ones in the folder `src/app/services/tetris-piece` | [Open Folder](src/app/services/tetris-piece/) |, which are:
- `tetris-piece-drawing.service.ts` | [Open File](src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service.ts) |, which is the service that draws the pieces. It's relative easy to understand how it works, since it's just a service that draws the pieces using the methods from the models to draw the pieces, so it's manly a service that calls that method or calls the next service.
