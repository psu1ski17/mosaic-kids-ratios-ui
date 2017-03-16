import React from 'react';
import WeekendGrid from './WeekendGrid';
import WeekendControl from './WeekendControl';
// import './HeaderBar.scss'; import classNames from 'classnames/bind'; import
// 'font-awesome-webpack'; import FontAwesome from 'react-fontawesome'; import *
// as util from './util.jsx';

export default class WeekendDisplay extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <WeekendGrid config={this.props.config}/>
                <WeekendControl />
            </div>
        );
    }
}
