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
}
