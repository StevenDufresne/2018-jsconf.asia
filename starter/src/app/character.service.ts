import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) { }

  getAllCharacters() {
     return this.http.get('//localhost:3002/api/characters');
  }

  getOneCharacter(name) {
    return this.http.get(`//localhost:3002/api/characters/${name}`);
  }

  search(term) {
    return this.http.post('//localhost:3002/api/search/', term);
  }


}
