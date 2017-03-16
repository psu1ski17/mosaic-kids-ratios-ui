import React from 'react';
import moment from 'moment';
import 'moment-timezone';
// import './HeaderBar.scss'; import classNames from 'classnames/bind'; import
// 'font-awesome-webpack'; import FontAwesome from 'react-fontawesome'; import *
// as util from './util.jsx';

export default class WeekendGrid extends React.Component {
    constructor() {
        super();
        this.fridayStart = moment().tz("America/New_York");
        this.fridayStart = this.fridayStart.day(-2).hour(0).minute(0).second(0).millisecond(0);
        console.log(this.fridayStart.format("dddd, MMMM Do YYYY, h:mm:ss a z Z"));
        this.querying = false;
    }

    handleWeekend(json) {
        console.log(json);
        this.weekend = json;
        this.querying = false;
        this.setState(this.state);
    }

    getWeekend(startDate) {
        let endDate = moment(startDate).add(7, 'd');
        let url = this.props.config.backendUrl + "rooms?startDate=" + startDate.valueOf() + "&endDate=" + endDate.valueOf();
        let init = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        };
        let callback = this.handleWeekend.bind(this);
        fetch(url, init).then((response) => {
            if (response.status !== 200) {
                console.log("Error attempting to retrieve data from " + url + ".  Message: recieved " + response.status);
            } else {
                console.log("Data retrieved");
                response.json().then((json) => {
                    callback(json);
                }).catch((err) => {
                    console.log("Error attempting parse json response of url " + url + ".  Message: " + err);
                    console.log(err.stack);
                });
            }
        }).catch((err) => {
            //catch on fetch
            console.log("Error attempting to submit data to " + url + ".  Message: " + err);
        });
    }

    renderServiceHeader(serviceName) {
        return (
            <td>{serviceName}</td>
        );
    }

    renderCell(room) {
        let kidToVol = room.numKids / room.numVolunteers;
        return (
            <td>
                {kidToVol}
            </td>
        );
    }

    renderRowLead(room) {
        return (
            <td>
                {room}
            </td>
        );
    }

    renderRows(weekend, roomName, serviceNames) {
        let order = [];
        order.fill(null, 0, serviceNames.length);
        for (let room of this.weekend) {
            if (room.room === roomName) {
                let index = serviceNames.indexOf(room.service);
                order[index] = room;
            }
        }
        let roomsRender = [];
        roomsRender.push(this.renderRowLead(roomName));
        for (let room of order) {
            let render = this.renderCell(room);
            roomsRender.push(render);
        }
        return (
            <tr>{roomsRender}</tr>
        );
    }

    render() {
        if (!this.props.config.loaded) {
            return null;
        }
        if (!this.weekend && !this.querying) {
            this.getWeekend(this.fridayStart);
            this.querying = true;
            return null;
        }
        if (this.querying) {
            return null;
        }
        let roomNames = [];
        let serviceNames = [];
        for (let room of this.weekend) {
            let i = roomNames.indexOf(room.room);
            if (i < 0) {
                roomNames.push(room.room);
            }
            i = serviceNames.indexOf(room.service);
            if (i < 0) {
                serviceNames.push(room.service);
            }
        }
        console.log(roomNames);
        console.log(serviceNames);
        let roomsRender = [];
        let headerRender = [];
        headerRender.push(this.renderServiceHeader(""));
        for (let serviceName of serviceNames) {
            let render = this.renderServiceHeader(serviceName);
            headerRender.push(render);
        }
        for (let roomName of roomNames) {
            let render = this.renderRows(this.weekend, roomName, serviceNames);
            roomsRender.push(render);
        }
        return (
            <div>
                <table>
                    <tr>{headerRender}</tr>
                    {roomsRender}
                </table>
            </div>
        );
    }
}
