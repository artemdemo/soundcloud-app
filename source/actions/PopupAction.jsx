import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

export class PopupAction {
    static open(user) {
        Dispatcher.dispatch({
            type: constants.OPEN_POPUP,
            data: user
        });
    }
}
