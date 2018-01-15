import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDisplayComponent } from './character-display/character-display.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CharacterService } from './character.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchresultComponent } from './searchresult/searchresult.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDisplayComponent,
    WelcomeComponent,
    SearchresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ CharacterService ],
  bootstrap: [AppComponent],
  entryComponents: [ SearchresultComponent ]
})
export class AppModule { }
