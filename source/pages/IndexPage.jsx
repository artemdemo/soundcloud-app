import * as React from 'react';
import {Logo} from '../components/Logo';
import {Regulator} from '../components/regulator/Regulator';
import {Search} from '../components/Search';

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

                    <genres></genres>

                    <catalog></catalog>

                    <comments></comments>
                </div>
                <div className="footer">
                    <div className="footer__title">
                        // New songs
                    </div>
                </div>
            </div>
        )
    }
}
