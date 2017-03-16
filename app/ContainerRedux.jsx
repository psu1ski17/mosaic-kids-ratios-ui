import React from 'react';
//import Clock from './Clock';
import HeaderBar from './HeaderBar';
import WeekendInput from './WeekendInput';
import WeekendDisplay from './WeekendDisplay';
import './main.scss';

export default class ContainerRedux extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="vertical-container main-container">
                <HeaderBar message={this.props.headerMessage}/>
                <WeekendInput
                    config={this.props.config}
                    inputDisplay={this.props.inputDisplay}
                    inputData={this.props.inputData}
                    onInputDataChange={this.props.onInputDataChange}
                    onInputDisplayChange={this.props.onInputDisplayChange}
                    onInputDataSet={this.props.onInputDataSet}/>
                <WeekendDisplay config={this.props.config}/>
                <HeaderBar message={this.props.footerMessage}/>
            </div>
        );
    }
}
