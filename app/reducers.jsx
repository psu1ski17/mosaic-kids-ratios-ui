import moment from 'moment';
import {Actions} from './actions';

const initialState = {
    headerMessage: "Header",
    footerMessage: "Footer",
    config: {
        backendUrl: null,
        loaded: false
    },
    dateRange: {
        startDate: 0,
        endDate: moment()
    }
};

function onDateChange(state, action) {
    switch (action.type) {
        case Actions.DATE_CHANGE:
            return {startDate: action.startDate, endDate: action.endDate};
        default:
            return state;
    }
}

function onConfigLoad(state, action) {
    switch (action.type) {
        case Actions.LOAD_CONFIG:
            action.config.loaded = true;
            return action.config;
        default:
            return state;
    }
}

function onInputDisplayChange(state, action) {
    switch (action.type) {
        case Actions.UPDATE_INPUT_DISPLAY:
            if (action.openService === state) {
                return "";
            } else {
                return action.openService;
            }
        default:
            return state;
    }
}

function updateInputData(state, action) {
    let services = state.services;
    let service = services[action.service];
    let room = Object.assign({}, service.rooms[action.room]);
    room.numKids = action.kids;
    service.rooms[action.room] = room;
    let newState = {
        services: services,
        weekend: state.weekend
    };
    return newState;
}

function onInputDataChange(state, action) {
    switch (action.type) {
        case Actions.UPDATE_INPUT_DATA:
            return updateInputData(state, action);
        case Actions.SET_INPUT_DATA:
            return action.data;
        default:
            return state;
    }
}

export function rootReducer(state = initialState, action) {
    return {
        dateRange: onDateChange(state.dateRange, action),
        headerMessage: state.headerMessage,
        footerMessage: state.footerMessage,
        config: onConfigLoad(state.config, action),
        inputDisplay: onInputDisplayChange(state.inputDisplay, action),
        inputData: onInputDataChange(state.inputData, action)
    };
}
