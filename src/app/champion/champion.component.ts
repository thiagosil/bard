import { Component } from '@angular/core';
import {NgFor} from '@angular/common';

import {HTTP_PROVIDERS} from '@angular/http';

import { ChampionService } from './champion.service';


@Component({
  selector: 'champion',
  template: require('./champion.html'),
  providers: [...HTTP_PROVIDERS, ChampionService],
  styles: [ require('./champion.css') ],
})

export class Champion {

  private championName: string;
  private champions: Array<Champion> = [];

  // Initialize our `ChampionData.name` to an empty `string`
  championData = {
    name: '',
    riotId: 0
  };

  constructor(public championService: ChampionService) {
    console.log('Champion constructor go!');

      //this.todos = [];
      championService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `Champions` array with the `response` data
            this.champions = res;
            // Reset `todo` input
            this.championData.name = '';
            this.championData.riotId = 0;
        });
  }

  createChampion() {

      this.championService.createChampion(this.championData)
        .subscribe((res) => {

            // Populate our `champion` array with the `response` data
            this.champions = res;
            // Reset `champion` input
            this.championData.name = '';
            this.championData.riotId = 0;
        });
  }

  deleteChampion(id) {

    this.championService.deleteChampion(id)
      .subscribe((res) => {

          this.champions = res;
      });
  }

}
