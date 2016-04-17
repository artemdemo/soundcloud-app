import * as React from 'react';
import * as constants from '../../constants';
import {SCStore} from '../../stores/SCStore';
import {StreamStore} from '../../stores/StreamStore';

export class Forward extends React.Component {
    state = {
        disabled: true
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StreamStore.on(constants.SONGS_LOADED, this.songsLoaded);
        StreamStore.on(constants.TRACK_STARTED_PLAYING, this.startedPlaying);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.SONGS_LOADED, this.songsLoaded);
        StreamStore.on(constants.TRACK_STARTED_PLAYING, this.startedPlaying);
    }

    songsLoaded = () => {
        this.setState({
            disabled: true
        });
    };

    startedPlaying = () => {
        const track = SCStore.getNextTrack(StreamStore.getCurrentTrackId());
        this.setState({
            disabled: !track
        });
    };

    forward = () => {
        const track = SCStore.getNextTrack(StreamStore.getCurrentTrackId());
        if (track) {
            StreamStore.playTrack(track.id);
        } else {
            this.setState({
                disabled: true
            });
        }
    };

    render() {
        const controlClass = this.state.disabled ?
            'player-controls__item player-controls__forward control_disabled' :
            'player-controls__item player-controls__forward';
        return (
            <div className={controlClass} onClick={this.forward}>
                <span className="fa fa-forward"></span>
            </div>
        )
    }
}
