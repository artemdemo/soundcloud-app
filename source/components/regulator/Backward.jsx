import * as React from 'react';
import * as constants from '../../constants';
import {SCStore} from '../../stores/SCStore';
import {StreamStore} from '../../stores/StreamStore';

export class Backward extends React.Component {
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
        const track = SCStore.getPrevTrack(StreamStore.getCurrentTrackId());
        this.setState({
            disabled: !track
        });
    };

    backward = () => {
        const track = SCStore.getPrevTrack(StreamStore.getCurrentTrackId());
        if (track) {
            StreamStore.playTrack(track.id);
        }
    };

    render() {
        const controlClass = this.state.disabled ?
            'player-controls__item player-controls__backward control_disabled' :
            'player-controls__item player-controls__backward';
        return (
            <div className={controlClass} onClick={this.backward}>
                <span className="fa fa-backward"></span>
            </div>
        )
    }
}
