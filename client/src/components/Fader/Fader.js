import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './fader.css';

const Fader = ({ children }) => (
    <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
    >
        { children }
    </CSSTransitionGroup>
);

export default Fader;
