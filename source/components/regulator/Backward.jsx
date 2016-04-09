import * as React from 'react';

export class Backward extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player-controls__item player-controls__backward" ng-class="{ \'control_disabled\': disabled }" ng-click="backward()">
                <span className="fa fa-backward"></span>
            </div>
        )
    }
}
