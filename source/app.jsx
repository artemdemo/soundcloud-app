import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import * as constants from './constants';
import IndexPage from './pages/IndexPage';

ReactDOM.render(
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <Route path="/">
            <IndexRoute component={IndexPage}/>
        </Route>
    </Router>,
    document.getElementById(constants.MAIN_CONTAINER_ID));
