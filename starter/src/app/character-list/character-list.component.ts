import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from '../character.service';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters;

  constructor(private cs: CharacterService) {
    cs.getAllCharacters()
    .subscribe(res => this.characters = res);
  }

  ngOnInit() {
  }

}
