import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { StoriesState, StoriesStateModel } from '../../state/stories/stories.state';
import { Observable } from 'rxjs';
import { GetStories } from '../../state/stories/stories.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Select(StoriesState) stories$: Observable<StoriesStateModel>;
  itemIds$ = this.stories$.pipe(
    map(s => Object.keys(s.items))
  )
  items$ = this.stories$.pipe(
    map(s => Object.values(s.items))
  )
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];
  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetStories({ type: 'top'})).subscribe();
  }
}
