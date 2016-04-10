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
        if (this.props.params.hasOwnProperty('genreType')) {
            this.updateGenre(this.props.params.genreType);
        } else {
            SCAction.fetchLastSongs();
        }
        SCStore.on(constants.SONGS_LOADED, this.updateSongsList);
    }

    componentWillUnmount() {
        SCStore.removeListener(constants.SONGS_LOADED, this.updateSongsList);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.hasOwnProperty('genreType')) {
            this.updateGenre(nextProps.params.genreType);
        } else {
            this.setState({
                title: LAST_SONGS,
                songs: []
            });
            SCAction.fetchLastSongs();
        }
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
