import * as React from 'react';

export class Comments extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comments" ng-class="{ \'comments_has-comments\': comments.length > 0 || reloading }">
                <div className="comments__title">Comments</div>
                <ul className="comments__list flat-list">
                    <li className="comments__none" ng-show="comments.length == 0 && ! reloading">no comments</li>
                    <li className="comments__list-item" ng-repeat="comment in comments">
                        comment.body
                    </li>
                </ul>
            </div>
        )
    }
}
