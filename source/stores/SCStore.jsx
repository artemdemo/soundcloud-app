import EventEmitter from 'eventemitter3';
import axios from 'axios';
import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

class SCStoreClass extends EventEmitter {
    clientId;
    baseUrl = 'http://api.soundcloud.com';
    songsList = [];

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.type) {
                case (constants.FETCH_CLIENT_ID):
                    this.fetchClientId();
                    break;
                case (constants.FETCH_LAST_SONGS):
                    this.fetchLastSongs();
                    break;
            }
        });
    }

    fetchClientId() {
        return new Promise((resolve, reject) => {
            if (this.clientId) {
                resolve();
            }
            axios.get('soundcloud-key.json')
                .then((responseObject) => {
                    this.clientId = responseObject.data.CLIENT_ID;
                    resolve();
                })
                .catch(() => {
                    this.emit(constants.ERROR_CLIENT_ID_LOADING);
                    reject();
                });
        });
    }

    fetchLastSongs() {
        this.fetchClientId().then(() => {
            axios.get(`${this.baseUrl}/tracks/?client_id=${this.clientId}`)
                .then((responseObject) => {
                    this.songsList = responseObject.data;
                    this.emit(constants.SONGS_LOADED)
                })
                .catch(() => this.emit(constants.ERROR_SONGS_LOADING));
        });
    }

    getSongsList = () => this.songsList;

    getGenres() {
        let genres = [];
        let genresNames = [
                'Classical',
                'Country',
                'Dance & EDM',
                'Dancehall',
                'Deep House',
                'Disco',
                'Drum & Bass',
                'Dubstep',
                'Electronic',
                'Folk & Singer-Songwriter',
                'Hip Hop & Rap',
                'House',
                'Indie',
                'Jazz & Blues',
                'Latin',
                'Metal',
                'Piano',
                'Pop',
                'R&B & Soul',
                'Reggae',
                'Reggaeton',
                'Rock',
                'Soundtrack',
                'Techno',
                'Trance',
                'Trap',
                'Trip Hop',
                'World'
            ];

        for (let i = 0, len = genresNames.length; i < len; i++) {
            genres.push({
                id: genresNames[i].toLowerCase().replace(/\s/g, '+'),
                name: genresNames[i]
            });
        }

        return genres
    }
}

export const SCStore = new SCStoreClass();
