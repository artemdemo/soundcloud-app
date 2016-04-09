import * as React from 'react';
import * as constants from '../../constants';
import {Song} from './Song';
import {SCAction} from '../../actions/SCAction';
import {SCStore} from '../../stores/SCStore';

export class Catalog extends React.Component {
    state = {
        songs: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SCStore.on(constants.SONGS_LOADED, this.updateSongsList);
    }

    componentWillUnmount() {
        SCStore.removeListener(constants.SONGS_LOADED, this.updateSongsList);
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
                <div className="catalog__title">Last songs</div>
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
