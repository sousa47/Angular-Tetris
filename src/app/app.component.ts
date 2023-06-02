import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { GameService } from './services/game/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tetris with Angular';
  tutorialW = 'Hard Drop';
  tutorialA = 'Move Left';
  tutorialS = 'Move Down';
  tutorialD = 'Move Right';
  tutorialE = 'Rotate Clockwise';
  tutorialF = 'Hold';
  tutorialG = 'Random Piece';

  score: number = 0;
  gameOverText: string = 'Game Over';

  public constructor(private _gameService: GameService) {}

  start(): void {
    this._gameService.startGame();
  }
}
