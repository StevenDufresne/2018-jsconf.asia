import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CharacterListComponent } from './character-list/character-list.component'
import { CharacterDisplayComponent } from './character-display/character-display.component'
import { SearchComponent } from './search/search.component'


const routes: Routes = [
  { path:'', component: WelcomeComponent },
  { path:'characters', component: CharacterListComponent },
  { path:'characters/:name', component: CharacterDisplayComponent }
  { path:'search', component: SearchComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
