import * as React from 'react';
import {Progress} from './Progress';
import {Backward} from './Backward';
import {Play} from './Play';
import {Forward} from './Forward';
import {AuthorAvatar} from './AuthorAvatar';
import * as constants from '../../constants';
import {StreamStore} from '../../stores/StreamStore';

export class Regulator extends React.Component {
    state = {
        currentTime: '00:00',
        durationTime: '00:00'
    };

    constructor(props) {
        super(props);
    }

    /**
     * Convert time in milliseconds into human format mm:ss
     * @param ms {number} - time in milliseconds
     * @returns {string}
     */
    msToTime(ms) {
        let seconds = ms / 1000;
        let mins = Math.floor( seconds / 60 );
        seconds = Math.floor( seconds - mins * 60 );
        seconds = seconds < 10 ? '0' + String(seconds) : String(seconds);
        return mins +':'+ seconds;
    };

    componentDidMount() {
        StreamStore.on(constants.TRACK_CHANGES_POSITION, this.updatePosition);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.TRACK_CHANGES_POSITION, this.updatePosition);
    }

    updatePosition = () => {
        const position = StreamStore.getCurrentTrackPosition();
        this.setState({
            currentTime: this.msToTime(position.current),
            durationTime: this.msToTime(position.duration)
        });
    };

    render() {
        return (
            <div className="regulator regulator_header">
                <AuthorAvatar></AuthorAvatar>
                <div className="player-controls">
                    <Backward></Backward>
                    <Play></Play>
                    <Forward></Forward>
                </div>
                <Progress></Progress>
                <div className="timer">
                    {this.state.currentTime} / {this.state.durationTime}
                </div>
            </div>
        )
    }
}
