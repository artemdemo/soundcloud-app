import * as React from 'react';

export class Progress extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="play-progress">
                <div className="play-progress__line-container" ng-click="setPosition()">
                    <div className="play-progress__line"></div>
                </div>
            </div>
        )
    }
}
