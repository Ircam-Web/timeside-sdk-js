/* tslint:disable */
/* eslint-disable */
/**
 * TimeSide API
 * RESTful API of TimeSide, a scalable audio processing framework.
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
 * @interface ItemAudioUrl
 */
export interface ItemAudioUrl {
    /**
     * 
     * @type {string}
     * @memberof ItemAudioUrl
     */
    readonly mp3?: string;
    /**
     * 
     * @type {string}
     * @memberof ItemAudioUrl
     */
    readonly ogg?: string;
    /**
     * 
     * @type {string}
     * @memberof ItemAudioUrl
     */
    readonly flac?: string;
}

export function ItemAudioUrlFromJSON(json: any): ItemAudioUrl {
    return ItemAudioUrlFromJSONTyped(json, false);
}

export function ItemAudioUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemAudioUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mp3': !exists(json, 'mp3') ? undefined : json['mp3'],
        'ogg': !exists(json, 'ogg') ? undefined : json['ogg'],
        'flac': !exists(json, 'flac') ? undefined : json['flac'],
    };
}

export function ItemAudioUrlToJSON(value?: ItemAudioUrl | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}


