import * as React from 'react';
import * as constants from '../constants';
import {SCStore} from '../stores/SCStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Comments extends React.Component {
    state = {
        comments: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SCStore.on(constants.COMMENTS_LOADED, this.updateComments);
    }

    componentWillUnmount() {
        SCStore.removeListener(constants.COMMENTS_LOADED, this.updateComments);
    }

    updateComments = () => {
        this.setState({
            comments: SCStore.getComments()
        });
    };

    renderComments = () => {
        if (this.state.comments.length > 0) {
            return this.state.comments.map(comment => (
                <li className="comments__list-item" key={comment.id}>
                    {comment.body}
                </li>
            ))
        } else {
            return (
                <li className="comments__none">no comments</li>
            )
        }
    };

    render() {
        const commentsClass = this.state.comments.length > 0 ? 'comments comments_has-comments' : 'comments';
        return (
            <div className={commentsClass}>
                <div className="comments__title">Comments</div>
                <ul className="comments__list flat-list">
                    <ReactCSSTransitionGroup
                        transitionEnterTimeout={constants.TRANSITION_ENTER}
                        transitionLeaveTimeout={constants.TRANSITION_LEAVE}
                        transitionName={{
                            enter: 'ng-enter',
                            leave: 'ng-leave',
                            appear: 'ng-appear'
                        }}>
                        {this.renderComments()}
                    </ReactCSSTransitionGroup>
                </ul>
            </div>
        )
    }
}
