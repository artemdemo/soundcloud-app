import * as React from 'react';
import * as constants from '../constants';
import {SCStore} from '../stores/SCStore';

export class ClientIdError extends React.Component {
    state = {
        show: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SCStore.on(constants.ERROR_CLIENT_ID_LOADING, this.showError);
    }

    componentWillUnmount() {
        SCStore.removeListener(constants.ERROR_CLIENT_ID_LOADING, this.showError);
    }

    showError = () => {
        this.setState({
            show: true
        });
    };

    render() {
        let msgClass = this.state.show ? 'clientid-error clientid-error_show' : 'clientid-error';

        return (
            <div className={msgClass}>
                <div className="clientid-error-message">
                    <div className="clientid-error-message__title">
                        Client ID loading error
                    </div>
                    <div className="clientid-error-message__content">
                        There is an error loading client id.
                        Please add <strong>soundcloud-key.json</strong> file with your CLIENT_ID
                    </div>
                </div>
            </div>
        )
    }
}
