import * as React from 'react';

export class Genres extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="genres">
                <div className="genres__title">Genres</div>
                <ul className="genres__list flat-list">
                    <li className="genres__list-item" ng-repeat="genre in ::genres">
                        <a href="#/genre/{{ genre.id }}" className="link genres__link"> genre.name </a>
                    </li>
                </ul>
            </div>
        )
    }
}
