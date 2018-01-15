import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {
  character;
  photo;
  constructor(private cs: CharacterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.cs.getCharacter(params.get('name')))
      .subscribe((response: any) => {
        this.character = response;
        this.photo = `http://localhost:3000${response.content.image}`;
      });

      this.router.events.subscribe(() => window.scrollTo(0, 0));
  }

}
