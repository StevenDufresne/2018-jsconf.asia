import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private cs: CharacterService, private route: ActivatedRoute) {
    route.paramMap.switchMap((params: ParamMap) => cs.getOneCharacter(params.get('name')))
      .subscribe((res: any) =>  {
        this.character = res
        this.photo = `//localhost:3002${res.content.image}`;
      })
  }

  ngOnInit() {
  }

}
