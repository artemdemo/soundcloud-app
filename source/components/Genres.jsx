import * as React from 'react';
import {Link} from 'react-router';
import {SCStore} from '../stores/SCStore';

export class Genres extends React.Component {
    state = {
        genres: []
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            genres: SCStore.getGenres()
        });
    }

    render() {
        return (
            <div className="genres">
                <div className="genres__title">Genres</div>
                <ul className="genres__list flat-list">
                    {this.state.genres.map(genre => (
                        <li className="genres__list-item" key={genre.id}>
                            <Link to={`/genre/${ genre.id }`} className="link genres__link">{ genre.name }</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
