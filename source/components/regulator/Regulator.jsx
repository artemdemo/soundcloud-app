import * as React from 'react';
import {Progress} from './Progress';
import {Backward} from './Backward';
import {Play} from './Play';
import {Forward} from './Forward';

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
                    <Backward></Backward>
                    <Play></Play>
                    <Forward></Forward>
                </div>
                <Progress></Progress>
                <div className="timer">
                    {this.state.currentTime} / {this.state.loadedTime}
                </div>
            </div>
        )
    }
}
