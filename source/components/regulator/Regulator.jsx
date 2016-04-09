import * as React from 'react';
import {Progress} from './Progress';

export class Regulator extends React.Component {
    state = {
        currentTime: '00:00',
        loadedTime: '00:00'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="regulator regulator_header">
                <div className="avatar" ng-click="openUser()">
                    <img className="avatar__image" ng-src="{{ avatar }}" />
                </div>
                <div className="player-controls">
                    <backward></backward>
                    <play></play>
                    <forward></forward>
                </div>
                <Progress></Progress>
                <div className="timer">
                    {this.state.currentTime} / {this.state.loadedTime}
                </div>
            </div>
        )
    }
}
