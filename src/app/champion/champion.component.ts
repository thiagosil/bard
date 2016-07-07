import { Component } from '@angular/core';
import {NgFor} from '@angular/common';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { ChampionService } from './champion.service';

@Component({
  selector: 'champion',
  template: require('./champion.html'),
  providers: [ChampionService],
  directives: [ROUTER_DIRECTIVES],
  styles: [ require('./champion.css') ],
})

export class Champion {

  private championName: string;
  private champions: Array<Champion> = [];
  private allChampions: Array<Champion> = [];

  constructor(public championService: ChampionService) {
    this.getChampions();
  }

  private getChampions()
  {
    this.championService.getAll()
      // `Rxjs`; we subscribe to the response
      .subscribe((res) => {

          // Populate our `Champions` array with the `response` data
          this.allChampions = res;
          this.champions = this.allChampions;
      });
  }

  filterChampions(championName: string){
    this.champions = this.allChampions.filter(function (el:any) {
        return (el.name.toUpperCase().includes(championName.toUpperCase()));
    });

  }

}
