import * as React from 'react';
import * as constants from '../../constants';
import {SCStore} from '../../stores/SCStore';
import {SCAction} from '../../actions/SCAction';
import {PopupAction} from '../../actions/PopupAction';
import {StreamStore} from '../../stores/StreamStore';
import {Popup} from '../Popup';

const DEFAULT_IMAGE = 'dist/img/avatar.jpg';

export class AuthorAvatar extends React.Component {
    state = {
        image: DEFAULT_IMAGE
    };

    user = null;

    constructor(props) {
        super (props);
    }

    componentDidMount() {
        StreamStore.on(constants.TRACK_STARTED_PLAYING, this.isPlaying);
        SCStore.on(constants.USER_LOADED, this.userLoaded);
    }

    componentWillUnmount() {
        StreamStore.removeListener(constants.TRACK_STARTED_PLAYING, this.isPlaying);
        SCStore.removeListener(constants.USER_LOADED, this.userLoaded);
    }

    isPlaying = () => {
        const currentTrack = SCStore.getTrackById(StreamStore.getCurrentTrackId());
        SCAction.fetchUser(currentTrack.user_id);
    };

    userLoaded = () => {
        this.user = SCStore.getCurrentUser();
        const avatar = this.user.avatar_url || DEFAULT_IMAGE;
        this.setState({
            image: avatar
        });
    };

    openUser = () => {
        if (this.user) {
            PopupAction.open();
        }
    };

    render() {
        return (
            <div>
                <div className="avatar" onClick={this.openUser}>
                    <img className="avatar__image" src={this.state.image} />
                </div>
                <Popup></Popup>
            </div>
        )
    }
}
