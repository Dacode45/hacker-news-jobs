import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Item, itemFromObj } from '../models/item';
import { User, userFromObj } from '../models/user';
import { StoryType } from '../models/story';

interface Updates {
  items: number[];
  profiles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  apiURL = `https://hacker-news.firebaseio.com/v0`;

  constructor(
    private http: HttpClient
  ) {}

  getItem(id: number): Observable<Item> {
    return this.http.get(`${this.apiURL}/item/${id}.json`).pipe(
      map(itemFromObj)
    );
  }

  getUser(name: string): Observable<User> {
    return this.http.get(`${this.apiURL}/user/${name}.json`).pipe(
      map(userFromObj)
    );
  }

  getStories(type: StoryType): Observable<number[]> {
    console.log('fetching', `${this.apiURL}/${type}stories.json`);
    return this.http.get<number[]>(`${this.apiURL}/${type}stories.json`).pipe(
      tap(() => console.log('here'))
    )
  }

  getUpdates(): Observable<Updates> {
    return this.http.get<Updates>(`${this.apiURL}/updates.json`);
  }

}
