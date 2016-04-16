import * as React from 'react';
import * as constants from '../constants';
import {SCStore} from '../stores/SCStore';

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
                <li className="comments__list-item">
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
                    {this.renderComments()}
                </ul>
            </div>
        )
    }
}
