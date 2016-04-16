import * as React from 'react';
import * as constants from '../../constants';
import {StreamAction} from '../../actions/StreamAction';
import {StreamStore} from '../../stores/StreamStore';

export class Song extends React.Component {
    state = {};
    defaultImage = 'dist/img/music-general.png';

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StreamStore.on(constants.TRACK_STARTED_PLAYING, this.isPlaying);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.TRACK_STARTED_PLAYING, this.isPlaying);
    }

    isPlaying = () => {

    };

    errorImageLoading = () => {
        this.refs.songImage.src = this.defaultImage;
    };

    playSong = () => {
        StreamAction.playTrack(this.props.song.id);
    };

    render() {
        return (
            <li className="catalog__list-item" ng-class="{ \'catalog__list-item_selected\' : track.selected }"
                onClick={this.playSong}>
                <div className="track-list__image">
                    <img ref="songImage"
                         className="track-list__image-item"
                         src={this.props.song.artwork_url || this.defaultImage}
                         onError={this.errorImageLoading}/>
                </div>
                <div className="track-list__title">{this.props.song.title}</div>
            </li>
        )
    }
}
