import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

export class SCAction {
    static fetchClientId() {
        Dispatcher.dispatch({
            type: constants.FETCH_CLIENT_ID
        });
    }

    static fetchLastSongs() {
        Dispatcher.dispatch({
            type: constants.FETCH_LAST_SONGS
        });
    }

    static fetchSongsByGenre(genreId) {
        Dispatcher.dispatch({
            type: constants.FETCH_SONGS_BY_GENRE,
            data: genreId
        });
    }

    static fetchComments(trackId) {
        Dispatcher.dispatch({
            type: constants.FETCH_COMMENTS,
            data: trackId
        });

    }
}
