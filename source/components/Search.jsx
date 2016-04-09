import * as React from 'react';

export class Search extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="search search_header">
                <form className="search__input-container" ng-submit="search($event)">
                    <input className="search__input" ng-model="searchStr" placeholder="Search" />
                </form>
            </div>
        )
    }
}
