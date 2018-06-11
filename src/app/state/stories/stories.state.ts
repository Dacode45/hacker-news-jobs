import { State, StateContext, Action } from '@ngxs/store';
import { Item } from '../../models/item';
import { HackerNewsService } from '../../services/hacker-news.service';
import { GetItem, GetItemSuccess, GetItemError, GetStories, GetStoriesSuccess } from './stories.actions';
import { tap, catchError } from 'rxjs/operators';
import { ALL_STORY_TYPES } from '../../models/story';

export interface StoriesStateModel {
    items: {[id: number]: Item};
    top: number[];
    new: number[];
    best: number[];
    ask: number[];
    show: number[];
    job: number[];
}

@State<StoriesStateModel>({
    name: 'stories',
    defaults: {
        items: {},
        top: [],
        new: [],
        best: [],
        ask: [],
        show: [],
        job: []
    }
})
export class StoriesState {
    constructor(private hn: HackerNewsService) {}

    @Action(GetStories)
    getStories({ getState, dispatch }: StateContext<StoriesStateModel>, { payload }: GetStories) {
        return this.hn.getStories(payload.type).pipe(
            tap(items => dispatch(new GetStoriesSuccess({ type: payload.type, items}))),
            tap(items => {
                const state = getState();
                const actions = items.map(item => {
                    return state.items[item] ? new GetItemSuccess({ item: state.items[item] }) : new GetItem({ item })
                });
                return dispatch(actions);
            }),
            catchError(err => dispatch(new GetItemError(err)))
        );
    }

    @Action(GetStoriesSuccess)
    getStoriesSuccess({ patchState }: StateContext<StoriesStateModel>, { payload }: GetStoriesSuccess) {
        const update = {};
        update[payload.type] = payload.items;
        patchState(update);
    }

    @Action(GetItem)
    getItem({ dispatch }: StateContext<StoriesStateModel>, { payload }: GetItem) {
        return this.hn.getItem(payload.item).pipe(
            tap(item => dispatch(new GetItemSuccess({ item }))),
            catchError(err => dispatch(new GetItemError(err)))
        );
    }

    @Action(GetItemSuccess)
    GetItemSuccess({ patchState, getState }: StateContext<StoriesStateModel>, { payload }: GetItemSuccess) {
        const state = getState();
        ALL_STORY_TYPES.forEach((type) => {
            if (state[type].includes(payload.item.id)) {
                payload.item.storyTypeTags.push(type);
            }
        });
        const items = state.items;
        items[payload.item.id] = payload.item;
        patchState({
            items
        });
    }
}