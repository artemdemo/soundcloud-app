import * as React from 'react';
import {Logo} from '../components/Logo';
import {Regulator} from '../components/regulator/Regulator';
import {Search} from '../components/Search';
import {Genres} from '../components/Genres';
import {Catalog} from '../components/catalog/Catalog';
import {Comments} from '../components/Comments';
import {ClientIdError} from '../components/ClientIdError';
import * as constants from '../constants';
import {SCAction} from '../actions/SCAction';
import {SCStore} from '../stores/SCStore';

export default class IndexPage extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SCAction.fetchLastSongs();
    }

    render() {
        return (
            <div className="container">
                <div className="main-header">
                    <Logo></Logo>

                    <Regulator></Regulator>

                    <Search></Search>
                </div>
                <div className="main-body">

                    <Genres></Genres>

                    <Catalog></Catalog>

                    <Comments></Comments>
                </div>
                <div className="footer">
                    <div className="footer__title">
                        // New songs
                    </div>
                </div>
                <ClientIdError></ClientIdError>
            </div>
        )
    }
}
