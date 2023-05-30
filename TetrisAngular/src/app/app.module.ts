import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainGameComponent } from './components/main-game/main-game.component';
import { HoldPieceComponent } from './components/hold-piece/hold-piece.component';
import { NextPiecesComponent } from './components/next-pieces/next-pieces.component';

@NgModule({
  declarations: [
    AppComponent,
    MainGameComponent,
    HoldPieceComponent,
    NextPiecesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
