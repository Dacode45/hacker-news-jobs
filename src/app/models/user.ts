export interface User {
    /**
     * The user's unique username. Case-sensitive. Required.
     * 
     * @type {string}
     * @memberof User
     */
    id: string;
    /**
     * Delay in minutes between a comment's creation and its visibility to other users.
     * 
     * @type {number}
     * @memberof User
     */
    delay: number;
    /**
     * Creation date of the user, in Unix Time.
     * 
     * @type {Date}
     * @memberof User
     */
    created: Date;
    /**
     * The user's karma.
     * 
     * @type {number}
     * @memberof User
     */
    karma: number;
    /**
     * The user's optional self-description. HTML.
     * 
     * @type {string}
     * @memberof User
     */
    about: string;
    /**
     * List of the user's stories, polls and comments.
     * 
     * @type {number[]}
     * @memberof User
     */
    submitted: number[];
}
/**
 * Converts an obj to satisfy the User interface
 * 
 * @export
 * @param {*} obj 
 * @returns {User} 
 */
export function userFromObj(obj: any): User {
    const user = {...obj};
    if (!(obj.created instanceof Date)) {
        user.created = new Date(obj.created)
    }
    return user;
}