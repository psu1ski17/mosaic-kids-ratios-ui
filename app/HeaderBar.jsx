import React from 'react';
import './HeaderBar.scss';
// import classNames from 'classnames/bind'; import 'font-awesome-webpack';
// import FontAwesome from 'react-fontawesome'; import * as util from
// './util.jsx';

export default class HeaderBar extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="header-bar">
                <span>
                    {this.props.message}
                </span>
            </div>
        );
    }
}
