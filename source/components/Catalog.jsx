import * as React from 'react';

export class Catalog extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="catalog">
                <div className="catalog__title"> title </div>
                <div className="catalog__loading" ng-hide="tracks.length > 0">
                    <img className="catalog__loading-img" src="img/loading.gif" />
                </div>
                <ul className="catalog__list flat-list clearFix">
                    <li className="catalog__list-item" ng-class="{ \'catalog__list-item_selected\' : track.selected }" ng-repeat="track in tracks" ng-click="playTrack(track)">
                        <div className="track-list__image">
                            <img check-image className="track-list__image-item" ng-src="{{ track.artwork_url }}" />
                        </div>
                        <div className="track-list__title"> track.title </div>
                    </li>
                </ul>
            </div>
        )
    }
}
