import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm;
  results;

  constructor(private cs: CharacterService) {
    this.cs = cs;
  }

  ngOnInit() {
  }

  search() {
    this.cs.search(this.searchTerm).subscribe(res => this.results = res);
  }
}
