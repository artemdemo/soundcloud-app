import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import * as constants from './constants';
import IndexPage from './pages/IndexPage';
import {Catalog} from './components/catalog/Catalog';

ReactDOM.render(
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <Route path="/" component={IndexPage}>
            <IndexRoute component={Catalog}/>
            <Route path="genre">
                <Route path=":genreType" component={Catalog}/>
            </Route>
            <Route path="search">
                <Route path=":searchQuery" component={Catalog}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById(constants.MAIN_CONTAINER_ID));
