import * as React from 'react';
import EventEmitter from 'eventemitter3';
import SC from 'soundcloud';
import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';
import {SCStore} from './SCStore';

const SOUND_LOAD_MIN_TIMEOUT = 1500;

class StreamStoreClass extends EventEmitter {
    baseUrl = 'http://api.soundcloud.com';
    currentTrackId;
    currentSound;
    currentPosition;
    soundIsStreaming = false;
    posUpdaterID;
    timeoutID;
    SCinitialized = false;

    constructor() {
        super();
        Dispatcher.register((action) => {
            switch (action.type) {
                case constants.PLAY:
                    this.playTrack(action.data);
                    break;
            }
        });
    }

    initializeSC() {
        if (!this.SCinitialized) {
            this.SCinitialized = true;
            SC.initialize({
                client_id: SCStore.getClientId()
            });
        }
    }

    /**
     * Start playing track by given id
     *
     * @param trackId
     */
    playTrack(trackId) {
        if ( !! this.currentSound ) {
            this.currentSound.stop();
            this.emit(constants.TRACK_STOPPED);
        }

        this.initializeSC();

        this.timeoutID = setTimeout(() => {
            // ToDo: Remove track from the list if it's not playing

            this.emit(constants.TRACK_STOPPED);
        }, SOUND_LOAD_MIN_TIMEOUT);

        SC.stream(`/tracks/${trackId}`)
            .then((sound) => {
                sound.play();
                this.currentTrackID = trackId;
                this.currentSound = sound;

                // http://stackoverflow.com/questions/24002302/soundcloud-javascript-sdk-2-0-whileplaying-event
                this.posUpdaterID = setInterval(this.updatePosition, 100);

                clearTimeout(this.timeoutID);
                this.soundIsStreaming = true;

                this.emit(constants.TRACK_STARTED_PLAYING);
            })
    }

    /**
     * Update position of the given track, so it can be showed in UI
     */
    updatePosition() {
        var _loaded = this.currentSound.getLoadedPosition(),
            _current = this.currentSound.getCurrentPosition();

        // I want to update position only if it really changed
        if ( this.currentPosition.current != _current ) {
            this.currentPosition = {
                current: _current,
                loaded: _loaded,
                relative: _loaded > 0 ? _current / _loaded * 100 : 0
            };

            this.emit('TRACK_CHANGES_POSITION');
        }
    }

    getCurrentTrackPosition = () => this.currentPosition;
}

export const StreamStore = new StreamStoreClass();
