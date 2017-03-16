import {connect} from 'react-redux';
import {ActionCreators} from './actions';
import ContainerRedux from './ContainerRedux';

const mapStateToProps = (state) => {
    return {
        headerMessage: state.headerMessage,
        footerMessage: state.footerMessage,
        dateRange: state.dateRange,
        config: state.config,
        inputDisplay: state.inputDisplay,
        inputData: state.inputData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDateChange: (startDate, endDate, config) => {
            dispatch(ActionCreators.onUserChange(startDate, endDate, config));
        },
        onInputDataChange: (service, room, kids) => {
            dispatch(ActionCreators.onInputDataChange(service, room, kids));
        },
        onInputDisplayChange: (openService) => {
            dispatch(ActionCreators.onInputDisplayChange(openService));
        },
        onInputDataSet: (data) => {
            dispatch(ActionCreators.onInputDataSet(data));
        }
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerRedux);

export default Container;
