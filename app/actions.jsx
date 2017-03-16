const DATE_CHANGE = 'DATE_CHANGE';
const LOAD_CONFIG = 'LOAD_CONFIG';
const UPDATE_INPUT_DATA = 'UPDATE_INPUT_DATA';
const UPDATE_INPUT_DISPLAY = 'UPDATE_INPUT_DISPLAY';
const SET_INPUT_DATA = 'SET_INPUT_DATA';

const DEFAULT_CONFIG_LOCATION = './config.json';

function fetchJsonUrl(url, callback) {
    return fetch(url).then((response) => {
        if (response.status !== 200) {
            console.log("Error attempting to retrieve from url " + url + ".  Message: recieved " + response.status);
        } else {
            response.json().then((json) => {
                callback(json);
            }
            //catch on json parse
            ).catch((err) => {
                console.log("Error attempting parse json response of url " + url + ".  Message: " + err);
                console.log(err.stack);
            });
        }
    }).catch((err) => {
        //catch on fetch
        console.log("Error attempting to retrieve from url at " + url + ".  Message: " + err);
    });
}

export function onDateChange(startDate, endDate) {
    return {type: DATE_CHANGE, startDate: startDate, endDate: endDate};
}

export function loadConfig(config) {
    return {type: LOAD_CONFIG, config: config};
}

export function fetchConfig(configLocation = DEFAULT_CONFIG_LOCATION) {
    return (dispatch) => {
        fetchJsonUrl(configLocation, (json) => {
            dispatch(loadConfig(json));
        });
    };
}

export function onInputDataChange(service, room, kids) {
    return {type: UPDATE_INPUT_DATA, service: service, room: room, kids: kids};
}

export function onInputDisplayChange(openService) {
    return {type: UPDATE_INPUT_DISPLAY, openService: openService};
}

export function onInputDataSet(data) {
    return {type: SET_INPUT_DATA, data: data};
}

export const Actions = {
    DATE_CHANGE,
    LOAD_CONFIG,
    UPDATE_INPUT_DATA,
    UPDATE_INPUT_DISPLAY,
    SET_INPUT_DATA
};
export const ActionCreators = {
    onDateChange,
    loadConfig,
    fetchConfig,
    onInputDataChange,
    onInputDisplayChange,
    onInputDataSet
};
