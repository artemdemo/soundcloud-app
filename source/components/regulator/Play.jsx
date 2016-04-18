import * as React from 'react';
import * as constants from '../../constants';
import {SCStore} from '../../stores/SCStore';
import {StreamStore} from '../../stores/StreamStore';

export class Play extends React.Component {
    state = {
        isPlaying: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StreamStore.on(constants.TRACK_STARTED_PLAYING, this.startedPlaying);
        StreamStore.on(constants.TRACK_STOPPED, this.stoppedPlaying);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.TRACK_STARTED_PLAYING, this.startedPlaying);
        StreamStore.removeListener(constants.TRACK_STOPPED, this.stoppedPlaying);
    }

    togglePlay = () => {
        if (StreamStore.isPlaying()) {
            StreamStore.stopTrack();
        } else {
            const currentSound = StreamStore.getCurrentSound();
            if (currentSound) {
                StreamStore.playTrack();
            } else {
                const songs = SCStore.getSongsList();
                if (songs.length > 0) {
                    StreamStore.playTrack(songs[0].id);
                } else {
                    console.error('There is no loaded songs');
                }
            }
        }
    };

    startedPlaying = () => this.setState({
        isPlaying: true
    });

    stoppedPlaying = () => this.setState({
        isPlaying: false
    });

    render() {
        const playBtnClass = this.state.isPlaying ? 'fa fa-stop' : 'fa fa-play';
        return (
            <div className="player-controls__item player-controls__play" onClick={this.togglePlay}>
                <span className={playBtnClass}></span>
            </div>
        )
    }
}
