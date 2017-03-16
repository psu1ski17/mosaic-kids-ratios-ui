import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import ServiceInput from './ServiceInput';
import './WeekendInput.scss';
// import classNames from 'classnames/bind'; import 'font-awesome-webpack';
// import FontAwesome from 'react-fontawesome'; import * as util from
// './util.jsx';

export default class WeekendInput extends React.Component {
    constructor() {
        super();
        this.fridayStart = moment().tz("America/New_York");
        this.fridayStart = this.fridayStart.day(-2).hour(0).minute(0).second(0).millisecond(0);
        console.log(this.fridayStart.format("dddd, MMMM Do YYYY, h:mm:ss a z Z"));

    }

    handleDateChange(dateString, config) {
        let startDate = moment(dateString);
        let endDate = startDate.add(7, 'days');
        this.props.onDateChange(startDate, endDate, config);
    }

    submitWeekend(backendUrl, data) {
        let url = backendUrl + "weekend";
        let init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, init).then((response) => {
            if (response.status !== 200 || response.status !== 204) {
                console.log("Error attempting submit data to " + url + ".  Message: recieved " + response.status);
            } else {
                console.log("Data submitted");
            }
        }).catch((err) => {
            //catch on fetch
            console.log("Error attempting to submit data to " + url + ".  Message: " + err);
        });
    }

    resetInputData() {
        //TODO get weekend name probably from date
        let weekendName = "weekendName";
        //easy deep copy
        let data = JSON.parse(JSON.stringify(this.props.config.defaultWeekend));
        data.weekend = weekendName;
        let services = data.services;
        for (let service in services) {
            if (services.hasOwnProperty(service)) {
                //TODO get number of volunteers from ajax
                let volunteers = 2;
                let kids = 0;
                let tsf = services[service].timeSinceFriday;
                let time = this.fridayStart.clone(); //set to fridayStart without changing fridayStart;
                time.add(tsf, 'ms'); //add the appropriate amount of milliseconds
                let roomsArray = services[service].rooms;
                services[service].time = time.valueOf();
                let rooms = {};
                for (let room of roomsArray) {
                    rooms[room] = {
                        room: room,
                        service: service,
                        weekend: weekendName,
                        campus: services[service].campus,
                        time: time.valueOf(),
                        numKids: kids,
                        numVolunteers: volunteers
                    };
                }
                services[service].rooms = rooms;
            }
            delete services[service].timeSinceFriday;
        }
        this.props.onInputDataSet(data);
    }

    renderServiceInput(weekend, serviceName, service) {
        let isOpen = (serviceName === this.props.inputDisplay);
        let time = service.time;
        // let time = fridayStart.clone(); //set to fridayStart without changing
        // fridayStart; time.add(details.timeSinceFriday, 'ms'); //add the appropriate
        // amount of milliseconds
        return <ServiceInput
            weekend={weekend}
            service={serviceName}
            campus={service.campus}
            time={time}
            rooms={service.rooms}
            onInputDisplayChange={this.props.onInputDisplayChange}
            onInputDataChange={this.props.onInputDataChange}
            isOpen={isOpen}></ServiceInput>;
    }

    render() {
        if (!this.props.config.loaded) {
            return null;
        }
        if (!this.props.inputData) {
            this.resetInputData();
            return null;
        }
        let data = this.props.inputData;
        let weekend = data.weekend;
        let services = data.services;
        let servicesRender = [];
        for (let serviceName in services) {
            if (services.hasOwnProperty(serviceName)) {
                let service = services[serviceName];
                let render = this.renderServiceInput(weekend, serviceName, service);
                servicesRender.push(render);
            }
        }
        return (
            <div>Input Data:
                <input
                    type="text"
                    name="Date"
                    value={this.fridayStart.format('M/D/YYYY')}
                    onChange={(event) => this.handleDateChange(event.currentTarget.value, this.props.config)}></input>
                <div className="services-input">
                    <div>Weekend: {weekend}</div >
                    {servicesRender}
                </div>
                <button
                    type="button"
                    onClick={() => this.submitWeekend(this.props.config.backendUrl, data)}>submit</button>
            </div>
        );
    }
}
