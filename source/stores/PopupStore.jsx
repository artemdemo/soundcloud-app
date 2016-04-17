import EventEmitter from 'eventemitter3';
import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';

class PopupStoreClass extends EventEmitter {
    user  = null;

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch(action.type) {
                case constants.OPEN_POPUP:
                    this.openPopup();
                    this.user = action.data;
                    break;
            }
        });
    }

    openPopup() {
        this.emit(constants.OPEN_POPUP);
    };

    getUser = () => this.user;
}

export const PopupStore = new PopupStoreClass();
