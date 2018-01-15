import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get('http://localhost:3000/api/characters');
  }

  getCharacter(name) {
    return this.http.get(`http://localhost:3000/api/characters/${name}`);
  }

  search(term) {
    return this.http.post('http://localhost:3000/api/search', term);
  }

}
