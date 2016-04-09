import * as React from 'react';

export class Logo extends React.Component {
    state = {};

    constructor(props) {
        super(props);
    }

    changeColor = () => {
        const colors = [
            '#c7093d',
            '#BD1D7E',
            '#BD1DB5',
            '#7C1DBD',
            '#3F1DBD',
            '#1D6EBD',
            '#1DBDAB',
            '#1DBD50',
            '#4CBD1D',
            '#9BBD1D',
            '#BD601D'
        ];
        const rndIndex = Math.floor(Math.random() * colors.length);
        this.refs.logoLink.style.backgroundColor = colors[rndIndex];
    };

    render() {
        return (
            <div className="logo logo_header">
                <a href="#/"
                   ref="logoLink"
                   className="link logo__item"
                   onMouseEnter={this.changeColor}>MusicApp</a>
            </div>
        )
    }
}
