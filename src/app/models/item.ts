import { StoryType } from "./story";

export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

/**
 * Item is a hackernews item
 * 
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * The item's unique id.
     * 
     * @type {number}
     * @memberof Item
     */
    id: number;
    /**
     * true if the item is deleted.
     * 
     * @type {boolean}
     * @memberof Item
     */
    deleted: boolean;
    /**
     * The type of item. One of "job", "story", "comment", "poll", or "pollopt".
     * 
     * @type {ItemType}
     * @memberof Item
     */
    type: ItemType;
    /**
     * The username of the item's author.
     * 
     * @type {string}
     * @memberof Item
     */
    by: string;
    /**
     * Creation date of the item, in Unix Time.
     * 
     * @type {Date}
     * @memberof Item
     */
    time: Date;
    /**
     * The comment, story or poll text. HTML.
     * 
     * @type {string}
     * @memberof Item
     */
    text: string;
    /**
     * true if the item is dead.
     * 
     * @type {boolean}
     * @memberof Item
     */
    dead: boolean;
    /**
     * The comment's parent: either another comment or the relevant story.
     * 
     * @type {number}
     * @memberof Item
     */
    parent: number;
    /**
     * The pollopt's associated poll.
     * 
     * @type {number}
     * @memberof Item
     */
    poll: number;
    /**
     * The ids of the item's comments, in ranked display order.
     * 
     * @type {number[]}
     * @memberof Item
     */
    kids: number[];
    /**
     * The URL of the story.
     * 
     * @type {string}
     * @memberof Item
     */
    url: string;
    /**
     * The story's score, or the votes for a pollopt.
     * 
     * @type {number}
     * @memberof Item
     */
    score: number;
    /**
     * The title of the story, poll or job.
     * 
     * @type {string}
     * @memberof Item
     */
    title: string;
    /**
     * A list of related pollopts, in display order.
     * 
     * @type {number[]}
     * @memberof Item
     */
    parts: number[];
    /**
     * In the case of stories or polls, the total comment count.
     * 
     * @type {number}
     * @memberof Item
     */
    descendants: number;

    /**
     * Whether this item is in jobs or top or other lists
     * 
     * @type {StoryType[]}
     * @memberof Item
     */
    storyTypeTags: StoryType[]
}

/**
 * Sanitizes an obj to be an item
 * 
 * @export
 * @param {*} obj 
 * @returns {Item} 
 */
export function itemFromObj(obj: any): Item {
    const item = {...obj};
    if (!(obj.time instanceof Date)) {
        item.time = new Date(obj.time);
    }
    item.storyTypeTags = item.storyTypeTags || [];
    return item;
}