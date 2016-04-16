import * as React from 'react';
import * as constants from '../../constants';
import {StreamStore} from '../../stores/StreamStore';

export class Progress extends React.Component {
    state = {
        playProgress: 0
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StreamStore.on(constants.TRACK_CHANGES_POSITION, this.updatePosition);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.TRACK_CHANGES_POSITION, this.updatePosition);
    }

    updatePosition = () => {
        this.setState({
            playProgress: StreamStore.getCurrentTrackPosition().relative.toFixed(2)
        });
    };

    userChangesPosition = () => {

    };

    render() {
        let styleProgress = {width: `${this.state.playProgress}%`};
        return (
            <div className="play-progress">
                <div className="play-progress__line-container" onClick={this.userChangesPosition}>
                    <div className="play-progress__line" style={styleProgress}></div>
                </div>
            </div>
        )
    }
}
