import * as React from 'react';
import * as constants from '../../constants';
import {Song} from './Song';
import {SCAction} from '../../actions/SCAction';
import {SCStore} from '../../stores/SCStore';

const LAST_SONGS = 'Last songs';

export class Catalog extends React.Component {
    state = {
        title: LAST_SONGS,
        songs: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateSongsState(this.props.params);
        SCStore.on(constants.SONGS_LOADED, this.updateSongsList);
    }

    componentWillUnmount() {
        SCStore.removeListener(constants.SONGS_LOADED, this.updateSongsList);
    }

    componentWillReceiveProps(nextProps) {
        this.updateSongsState(nextProps.params);
    }

    updateSongsState(propsParams) {
        if (propsParams.hasOwnProperty('genreType')) {
            this.updateGenre(propsParams.genreType);
        } else if (propsParams.hasOwnProperty('searchQuery')) {
            this.updateSearch(propsParams.searchQuery);
        } else {
            this.setState({
                title: LAST_SONGS,
                songs: []
            });
            SCAction.fetchLastSongs();
        }
    }

    updateSearch(query) {
        this.setState({
            title: 'Search: ' + decodeURI(query),
            songs: []
        });
        SCAction.fetchSongsBySearch(query);
    }

    updateGenre(genreType) {
        let genre = SCStore.getGenreById(genreType);
        if (genre) {
            this.setState({
                title: 'Genre: ' + genre.name,
                songs: []
            });
            SCAction.fetchSongsByGenre(genreType);
        }
    }

    updateSongsList = () => {
        this.setState({
            songs: SCStore.getSongsList()
        })
    };

    renderLoader = () => {
        if (this.state.songs.length == 0) {
            return (
                <div className="catalog__loading">
                    <img className="catalog__loading-img" src="dist/img/loading.gif" />
                </div>
            )
        }
        return '';
    };

    render() {
        return (
            <div className="catalog">
                <div className="catalog__title">{this.state.title}</div>
                { this.renderLoader() }
                <ul className="catalog__list flat-list clearFix">
                    {this.state.songs.map(song => (
                        <Song song={song} key={song.id}></Song>
                    ))}
                </ul>
            </div>
        )
    }
}
