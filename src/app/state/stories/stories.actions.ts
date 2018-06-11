import { StoryType } from "../../models/story";
import { Item } from "../../models/item";

export class GetStories {
    static readonly type = '[Stories] GetStories';
    constructor(public payload: { type: StoryType }) {}
}

export class GetStoriesSuccess {
    static readonly type = '[Stories] GetStoriesSuccess';
    constructor(public payload: { type: StoryType, items: number[] }) {}
}

export class GetStoriesError {
    static readonly type = '[Stories] GetStoriesError';
    constructor(public payload: Error) {}
}

export class GetItem {
    static readonly type = '[Stories] GetItem';
    constructor(public payload: { item: number }) {}
}

export class GetItemSuccess {
    static readonly type = '[Stories] GetItemSuccess';
    constructor(public payload: { item: Item }) {}
}

export class GetItemError {
    static readonly type = '[Stories] GetItemError';
    constructor(public payload: Error) {}
}