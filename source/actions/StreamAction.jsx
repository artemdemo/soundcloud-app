import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

export class StreamAction {
    static playTrack(trackId) {
        Dispatcher.dispatch({
            type: constants.PLAY,
            data: trackId
        });
    }
}
