import * as React from 'react';

export class Song extends React.Component {
    state = {};
    defaultImage = 'dist/img/music-general.png';

    constructor(props) {
        super(props);
    }

    errorImageLoading = () => {
        this.refs.songImage.src = this.defaultImage;
    };

    render() {
        return (
            <li className="catalog__list-item" ng-class="{ \'catalog__list-item_selected\' : track.selected }">
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
