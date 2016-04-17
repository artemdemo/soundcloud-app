import * as React from 'react';
import * as constants from '../constants';
import {PopupStore} from '../stores/PopupStore';

export class Popup extends React.Component {
    state = {
        title: '',
        body: '',
        animationIn: false,
        animationOut: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        PopupStore.on(constants.OPEN_POPUP, this.open);
        PopupStore.on(constants.CLOSE_POPUP, this.close);
    }

    componentWillUnmount() {
        PopupStore.removeListener(constants.OPEN_POPUP, this.open);
        PopupStore.removeListener(constants.CLOSE_POPUP, this.close);
    }

    open = () => {
        this.setState({
            animationIn: true,
            animationOut: false
        });
    };

    close = () => {
        this.setState({
            animationIn: false,
            animationOut: true
        });
        setTimeout(() => {
            this.setState({
                animationIn: false,
                animationOut: false
            });
        }, 300);
    };

    render() {
        const title = '';
        const country = '';
        const description = '';
        let popupClass = 'popup';
        let backdropClass = 'popup-backdrop';
        if (this.state.animationIn && !this.state.animationOut) {
            popupClass += ' zoomIn';
            backdropClass += ' fadeIn';
        } else if (!this.state.animationIn && this.state.animationOut) {
            popupClass += ' zoomOut';
            backdropClass += ' fadeOut';
        }
        return (
            <popup style={{
                display: this.state.animationIn || this.state.animationOut ? 'block' : 'none'
            }}>
                <div className="popup-container">
                    <div className={popupClass}>
                        <div className="popup-head">
                            <h3 className="popup-title">{title}</h3>
                        </div>
                        <div className="popup-body">
                            <div>
                                <span class="popup-user__text-title">Country: </span>
                                {country}
                            </div>
                            <div>
                                <span class="popup-user__text-title">Description: </span>
                                {description}
                            </div>
                        </div>
                        <div className="popup-buttons">
                            <button className="btn" onClick={this.close}>OK</button>
                        </div>
                    </div>
                </div>
                <div className={backdropClass}></div>
            </popup>
        )
    }
}
