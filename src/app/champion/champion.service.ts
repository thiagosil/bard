import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ChampionService {

  constructor(private http: Http) { }

  getAll() {
      return this.http.get('/api/champion')
          // map the `HTTP` response from `raw` to `JSON` format
          // using `RxJs`
          // Reference: https://github.com/Reactive-Extensions/RxJS
          .map(res => res.json());
  }

  createChampion(data) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/champion', JSON.stringify(data),
          {headers: headers})
        .map(res => res.json());
  }

  deleteChampion(id) {

      return this.http.delete(`/api/champion/${id}`)
          .map(res => res.json());
  }

  private getLolKingUrl(championName: string): string
  {
      return `http://www.lolking.net/guides/champion/${championName}`;
  }

  private getImageUrl(championName: string): string
  {
  return `http://ddragon.leagueoflegends.com/cdn/6.13.1/img/champion/${championName}.png`;
  }
}
