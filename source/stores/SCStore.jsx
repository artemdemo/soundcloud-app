import EventEmitter from 'eventemitter3';
import axios from 'axios';
import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

class SCStoreClass extends EventEmitter {
    clientId;
    baseUrl = 'http://api.soundcloud.com';
    songsList = [];
    comments = [];
    currentUser;

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
                case (constants.FETCH_SONGS_BY_GENRE):
                    this.fetchSongsByGenre(action.data);
                    break;
                case (constants.SEARCH_SONGS):
                    this.searchSongs(action.data);
                    break;
                case (constants.FETCH_COMMENTS):
                    this.fetchTrackComments(action.data);
                    break;
                case (constants.FETCH_USER):
                    this.fetchUserById(action.data);
                    break;
            }
        });
    }

    /**
     * Load client id for stream API calls
     * @returns {Promise}
     */
    fetchClientId() {
        return new Promise((resolve, reject) => {
            if (this.clientId) {
                resolve();
            }
            axios.get('soundcloud-key.json')
                .then((responseObject) => {
                    this.clientId = responseObject.data.CLIENT_ID;
                    this.emit(constants.CLIENT_ID_LOADED);
                    resolve();
                })
                .catch(() => {
                    this.emit(constants.ERROR_CLIENT_ID_LOADING);
                    reject();
                });
        });
    }

    /**
     * Load last tracks
     */
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

    /**
     * Load tracks by given genre name
     * @param genreId {number}
     */
    fetchSongsByGenre(genreId) {
        this.fetchClientId().then(() => {
            axios.get(`${this.baseUrl}/tracks/?genres=${genreId}&client_id=${this.clientId}`)
                .then((responseObject) => {
                    this.songsList = responseObject.data;
                    this.emit(constants.SONGS_LOADED)
                })
                .catch(() => this.emit(constants.ERROR_SONGS_LOADING));
        });
    }

    /**
     * Load tracks by given search query
     * @param query {string}
     */
    searchSongs(query) {
        this.fetchClientId().then(() => {
            axios.get(`${this.baseUrl}/tracks/?q=${query}&client_id=${this.clientId}`)
                .then((responseObject) => {
                    this.songsList = responseObject.data;
                    this.emit(constants.SONGS_LOADED)
                })
                .catch(() => this.emit(constants.ERROR_SONGS_LOADING));
        });
    }

    /**
     * Load comments by given track id
     * @param trackId
     */
    fetchTrackComments(trackId) {
        axios.get(`${this.baseUrl}/tracks/${trackId}/comments?client_id=${this.clientId}`)
            .then((responseObject) => {
                this.comments = responseObject.data;
                this.emit(constants.COMMENTS_LOADED)
            });
    }

    fetchUserById(userId) {
        axios.get(`${this.baseUrl}/users/${userId}/?client_id=${this.clientId}`)
            .then((responseObject) => {
                this.currentUser = responseObject.data;
                this.emit(constants.USER_LOADED)
            });
    }

    /**
     * Fetch next track by given track id
     * @param trackId {number}
     * @returns {Object|null}
     */
    getNextTrack(trackId) {
        for (let i = 0, len = this.songsList.length; i < len; i++) {
            if (this.songsList[i].id == trackId && this.songsList[i+1]) {
                return this.songsList[i+1]
            }
        }
        return null;
    }

    /**
     * Fetch previous track by given track id
     * @param trackId {number}
     * @returns {Object|null}
     */
    getPrevTrack(trackId) {
        for (let i = 1, len = this.songsList.length; i < len; i++) {
            if (this.songsList[i].id == trackId) {
                return this.songsList[i-1]
            }
        }
        return null;
    }

    /**
     * Get track by id from songs list
     * @param trackId {number}
     * @returns {Object|null}
     */
    getTrackById(trackId) {
        for (let i = 0, len = this.songsList.length; i < len; i++) {
            if (this.songsList[i].id == trackId) {
                return this.songsList[i]
            }
        }
        return null;
    }

    getSongsList = () => this.songsList;

    getComments = () => this.comments;

    getCurrentUser = () => this.currentUser;

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
        return genres;
    }

    getGenreById(genreId) {
        const genres = this.getGenres();
        for (let i = 0, len = genres.length; i < len; i++) {
            if (genreId == genres[i].id) {
                return genres[i];
            }
        }
        return null;
    }

    getClientId = () => this.clientId;
}

export const SCStore = new SCStoreClass();
