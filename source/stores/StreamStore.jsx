import * as React from 'react';
import EventEmitter from 'eventemitter3';
import {Dispatcher} from '../dispatcher';
import * as constants from '../constants';
import {SCStore} from './SCStore';
import {SCAction} from '../actions/SCAction';

const SOUND_LOAD_MIN_TIMEOUT = 1500;

class StreamStoreClass extends EventEmitter {
    baseUrl = 'http://api.soundcloud.com';
    currentSound;
    currentTrackId;
    currentPosition = {};
    soundIsStreaming = false;
    timeoutID;
    posUpdaterID;
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

    /**
     * Initializing SC SDK
     */
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
     * @param trackId {number}
     */
    playTrack(trackId) {
        if (!trackId && this.currentSound && this.soundIsStreaming == false) {
            this.currentSound.play();
            this.soundIsStreaming = true;
            this.emit(constants.TRACK_STARTED_PLAYING);
            return;
        } else if (!trackId) {
            console.error('trackId is not provided');
            return;
        } else if (trackId && this.currentSound) {
            this.stopTrack();
        }

        this.initializeSC();

        this.timeoutID = setTimeout(() => {
            // ToDo: Remove track from the list if it's not playing

            this.soundIsStreaming = false;
            this.emit(constants.TRACK_STOPPED);
        }, SOUND_LOAD_MIN_TIMEOUT);

        // Documentation for SDK:
        // https://developers.soundcloud.com/docs/api/sdks
        SC.stream(`/tracks/${trackId}`, (sound) => {
            this.currentSound = sound;
            this.currentSound.play();

            this.posUpdaterID = setInterval(this.updatePosition, 100);

            this.currentTrackId = trackId;
            this.soundIsStreaming = true;
            SCAction.fetchComments(trackId);
            clearTimeout(this.timeoutID);
            this.emit(constants.TRACK_STARTED_PLAYING);
        });
    }

    /**
     * Pause currently playing track
     */
    stopTrack = () => {
        if (this.currentSound) {
            clearInterval(this.posUpdaterID);
            this.currentSound.stop();
            this.currentPosition = {
                current: 0,
                duration: 0,
                relative: 0
            };
            this.clearCurrentSoundAndTrack();
            this.emit(constants.TRACK_STOPPED);
        }
    };

    /**
     * Update position of the given track, so it can be showed in UI
     */
    updatePosition = () => {
        console.log('updatePosition');
        let _duration = this.currentSound.getLoadedPosition();
        let _current = this.currentSound.getCurrentPosition();

        // I want to update position only if it really changed
        if ( this.currentPosition.current != _current ) {
            this.currentPosition = {
                current: _current,
                duration: _duration,
                relative: _duration > 0 ? _current / _duration * 100 : 0
            };

            this.emit(constants.TRACK_CHANGES_POSITION);
        }
    };

    clearCurrentSoundAndTrack = () => {
        this.currentSound = null;
        this.currentTrackId = null;
        this.soundIsStreaming = false;
    };

    getCurrentTrackPosition = () => this.currentPosition;

    getCurrentTrackId = () => this.currentTrackId;

    getCurrentSound = () => this.currentSound;

    isPlaying = () => this.currentTrackId && this.currentSound && this.soundIsStreaming;
}

export const StreamStore = new StreamStoreClass();
