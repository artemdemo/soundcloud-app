import * as React from 'react';

export class Search extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    search = (e) => {
        e.preventDefault();
        const searchQuery = this.refs.searchQuery.value;
        if (searchQuery) {
            window.location.hash = `#/search/${encodeURI(searchQuery)}`;
        }
    };

    render() {
        return (
            <div className="search search_header">
                <form className="search__input-container" onSubmit={this.search}>
                    <input className="search__input" ref="searchQuery" placeholder="Search" />
                </form>
            </div>
        )
    }
}
