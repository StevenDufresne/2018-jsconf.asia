import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { CharacterService } from './character.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal, private cs: CharacterService) { }
  searchTerm;

  search() {
    console.log('called');
    console.log(this.searchTerm);
    this.cs.search(this.searchTerm).subscribe(response => {
      const modalRef = this.modalService.open(SearchresultComponent);
      modalRef.componentInstance.results = response;
    });
  }
}
