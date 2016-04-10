import * as React from 'react';
import {Logo} from '../components/Logo';
import {Regulator} from '../components/regulator/Regulator';
import {Search} from '../components/Search';
import {Genres} from '../components/Genres';
import {Comments} from '../components/Comments';
import {ClientIdError} from '../components/ClientIdError';
export default class IndexPage extends React.Component {
    state = {};

    constructor(props) {
        super(props);
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

                    {this.props.children}

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
