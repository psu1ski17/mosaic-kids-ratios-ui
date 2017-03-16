import React from 'react';
import classNames from 'classnames/bind';
import './main.scss';
import moment from 'moment';
import 'moment-timezone';
// import moment from 'moment'; import './HeaderBar.scss'; import classNames
// from 'classnames/bind'; import 'font-awesome-webpack'; import FontAwesome
// from 'react-fontawesome'; import * as util from './util.jsx';

export default class WeekendInput extends React.Component {
    constructor() {
        super();
    }

    renderRoomInput(room) {
        let errorBoxText = "Input not valid.  Please enter a non-negative number.";
        let val = (parseInt(room.numKids, 10));
        let isIntegerNumeric = !isNaN(val) && isFinite(val);
        let isError = !isIntegerNumeric || val < 0;
        let errorBoxStyles = classNames({
            hidden: !isError,
            errorMessage: isError
        });
        return (
            <div>Room: {room.room}
                &nbsp;&nbsp;&nbsp; kids:<input
                    type="text"
                    name="Date"
                    value={room.numKids}
                    onChange={(event) => this.props.onInputDataChange(room.service, room.room, event.currentTarget.value)}></input>
                <span className={errorBoxStyles}>{errorBoxText}</span>
            </div>
        );
    }

    handleDisplayChange(service) {
        this.props.onInputDisplayChange(service);
    }

    render() {
        let roomInputs = [];
        let rooms = this.props.rooms;
        for (let roomName in rooms) {
            if (rooms.hasOwnProperty(roomName)) {
                let room = rooms[roomName];
                roomInputs.push(this.renderRoomInput(room));
            }
        }
        let isClosed = !this.props.isOpen;
        let visibilty = classNames({'hidden': isClosed});
        let time = moment(this.props.time).tz("America/New_York").format('M/D/YYYY h:mm:ss a');
        return (
            <div>
                <div onClick={() => this.handleDisplayChange(this.props.service)}>Service: {this.props.service}</div>
                <section className={visibilty}>
                    <div>
                        Campus : {this.props.campus}
                    </div>
                    <div>Time: {time}</div>
                    <div>
                        {roomInputs}
                    </div>
                </section>
            </div>
        );
    }
}
