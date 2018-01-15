import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters;
  constructor(private cs: CharacterService) { }

  ngOnInit() {
    this.cs.getCharacters().subscribe(characterData => this.characters = characterData);
  }

}
