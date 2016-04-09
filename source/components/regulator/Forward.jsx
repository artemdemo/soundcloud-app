import * as React from 'react';

export class Forward extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="player-controls__item player-controls__forward" ng-class="{ \'control_disabled\': disabled }" ng-click="forward()">
                <span className="fa fa-forward"></span>
            </div>
        )
    }
}
