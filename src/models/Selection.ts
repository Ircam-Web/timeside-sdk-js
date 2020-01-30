/* tslint:disable */
/* eslint-disable */
/**
 * TimeSide API
 * RESTful API of TimeSide,                 a scalable audio processing framework
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Selection
 */
export interface Selection {
    /**
     * 
     * @type {string}
     * @memberof Selection
     */
    author?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Selection
     */
    items?: Array<string>;
    /**
     * include other selections in an selection
     * @type {Array<string>}
     * @memberof Selection
     */
    selections?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Selection
     */
    readonly title?: string;
    /**
     * 
     * @type {string}
     * @memberof Selection
     */
    readonly url?: string;
    /**
     * 
     * @type {string}
     * @memberof Selection
     */
    readonly uuid?: string;
}

export function SelectionFromJSON(json: any): Selection {
    return SelectionFromJSONTyped(json, false);
}

export function SelectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Selection {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'author': !exists(json, 'author') ? undefined : json['author'],
        'items': !exists(json, 'items') ? undefined : json['items'],
        'selections': !exists(json, 'selections') ? undefined : json['selections'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
    };
}

export function SelectionToJSON(value?: Selection | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'author': value.author,
        'items': value.items,
        'selections': value.selections,
    };
}


