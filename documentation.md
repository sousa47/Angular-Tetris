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

- **Presentation Tier**: The presentation tier is the tier that the user interacts with. It's the tier that the user sees and interacts with. In this case, it's the angular application. In this project those are the components that are inside the `src/app/components` folder | [Open Folder](src/app/components/) |.
- **Application Tier**: The application tier is the tier that contains the app logic. In this case, it's the game logic. In this project, it's the services | [Open Folder](src/app/services/) | and models | [Open Folder](src/app/models/) |.

### How It Was Done

The game was done using the **canvas** element from `HTMLCanvasElement`. The canvas element is a HTML element that can be used to draw graphics using JavaScript. It's a rectangular area on an HTML page. By default, a canvas has no border and no content.

To draw on the canvas element, it requires a **context**. The context is the tool that is used to draw on the canvas. The context can be 2D or 3D. In this case, the context used was the 2D context.

Each piece was drawn using rectangles with the **fillRect** method from the context. The **fillRect** method draws a filled rectangle on the canvas. The **fillRect** method takes four parameters: **x**, **y**, **width**, and **height**. The **x** and **y** parameters specify the position on the canvas (relative to the canvas left top corner) where to place the rectangle. The **width** and **height** parameters specify the size of the rectangle. While drawing the pieces, it was also drawn the inner and outer borders of the pieces.

To auxiliate and simplifly the drawing of the pieces, it was used a service and some model class's. The services use are in the `src/app/services/tetris-piece/` folder | [Open Folder](src/app/services/etris-piece/) |. The model class's are the `src/app/models` folder | [Open Folder](src/app/models/) |.

#### Services and Model Class's to Draw the Pieces

The services used to draw were the ones in the folder `src/app/services/tetris-piece` | [Open Folder](src/app/services/tetris-piece/) |, which are:
- `tetris-piece-drawing.service.ts` | [Open File](src/app/services/tetris-piece/tetris-piece-drawing/tetris-piece-drawing.service.ts) |, which is the service that draws the pieces. It's relative easy to understand how it works, since it's just a service that draws the pieces using the methods from the models to draw the pieces, so it's manly a service that calls that method or calls the next service.
- `tetris-piece-object.service.ts` | [Open File](src/app/services/tetris-piece/tetris-piece-object/tetris-piece-object.service.ts) |, which is the service that creates the pieces. It's basically the service that creates the pieces objects setting their base properties. This service is used by the `tetris-piece-drawing.service.ts` service to get a piece object and draw it.

The model class's used are concrete class' that extends the abstract class `tetris-piece.ts` | [Open File](src/app/models/tetris-piece/tetris-piece.ts) |. The abstract class allows for similiar functions to be used for all the pieces, since all the pieces have the same properties, but different values. The reason there is concrete class', is because how which piece is drawn is different, so each piece has it's own class that extends the abstract class and implements the abstract methods. Some are short and easy to understand, like the OPiece (the square piece) | [Open File](src/app/models/pieces/concrete-pieces/o-piece.ts) |, but others are more complex, like the TPiece (the piece that looks like a T) | [Open File](src/app/models/pieces/concrete-pieces/t-piece.ts) |. Eventhough the TPiece is more complex, it's still easy to understand how it works, since it's just a bunch of rectangles being drawn, there's just a lot of private method to auxiliate the drawing of the piece.

Most components are based on the previous services and models and what they mostly do is call a service to do all the work.


#### The other services

Besides of those previous services, for a base functionality of the game, there's a service for it. Those services are:
- `game.service.ts` | [Open File](src/app/services/game/game.service.ts) |, which is the service that controls the game. It's the service that controls the game state, when to start, the speed of the game, the score, etc... .
- `next-pieces.service.ts` | [Open File](src/app/services/next-pieces/next-pieces.service.ts) |, which is the service that controls the next pieces and shows them on the screen. It also sets the next piece for the player when the current piece is placed. This service was previously planned to use a canvas, just like the main canvas, to draw the pieces, but given some complications, regarding the `CanvasRenderingContext2D` from the canvas, it was decided to use images instead. The images are in the `src/assets/images` folder | [Open Folder](src/assets/images/) |.
- `observable-tetris-piece.service.ts` | [Open File](src/app/services/observable-tetris-piece/observable-tetris-piece.service.ts) |, this service is basically the "bridge" between the components, given the complexity of the Inputs and Outputs, this service replaces that using observers, that detect when a given `subject`, which is a property to be observed, changes, which then calls a method that is subscribed to that observer. To implement it the component just needs to `subscribe` to the property that desires to check for changes.
- `tetris-collision.service.ts` | [Open File](src/app/services/tetris-collision/tetris-collision.service.ts) |, this service is the one that checks for collisions. It's a service that checks if the piece is colliding with the walls, the floor or other pieces. The `main game component` | [Open File](src/app/components/main-game/main-game.component.ts) |, uses this service to check if the piece is colliding with something, since it's the one that listens for the user input and moves the piece. In case there's a collision happening the input is ignored. The same way each piece has it's own class to draw, each piece has it's own class to check for collisions, since each piece has it's own collision logic.


## Implementation Details

For more details about the implementation, please check the this [document](src/assets/documentation/implementation.md).
