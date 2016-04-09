import * as React from 'react';

export class Play extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player-controls__item player-controls__play" ng-click="play()">
                <span className="fa" ng-class="{ \'fa-play\': ! isPlaying, \'fa-stop\': isPlaying }"></span>
            </div>
        )
    }
}
