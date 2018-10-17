import React, { Component } from 'react';
import { INIT_UI, SHOW_ALL_RATINGS } from './ducks/ui';
import { RATE_AGENT } from './ducks/data';
import { GO_TO_RATING, GO_TO_HOME, CHANGE_MODAL, UPDATE_SLIDER } from './ducks/ui';
import store from './../store';
import Star from './components/Main/Star';
import Slider from './components/Main/Slider';
import Selector from './components/Main/Selector';
import Modal from './components/common/Modal';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
    componentDidMount() {
        store.dispatch({type: INIT_UI});
    }

    render() {
        let comp;
        if (this.props.location === 'home')
            comp = <Selector {...this.props}/>
        else 
            comp = <Slider {...this.props}/>;

        return (
            <div className="App col-lg-5 m-auto">
                <Modal {...this.props}/>
                <header className="App-header"></header>
                <Star {...this.props}/>
                {comp}
            </div>
        );
    }
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        location: state.ui.location,
        currentAgent: state.data.currentAgent,
        enrolled: state.data.enrolled,
        modal: state.ui.modal,
        user: state.data.user,
        sliderValue: state.ui.sliderValue
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        handleOptionChange: (Hash) => {
            dispatch({
                type: GO_TO_RATING,
                payload: Hash
            });
        },
        handleBackClick: () => {
            dispatch({
                type: GO_TO_HOME, 
                payload: 'home'
            });
        }, 
        handleRateClick: () => {
            dispatch({
                type: RATE_AGENT
            });
        },
        handleDownClick: () => {
            dispatch({
                type: SHOW_ALL_RATINGS
            });
        },
        closeModal: () => {
            dispatch({type: CHANGE_MODAL, payload: {
                isShowing: false,
                text: ''
            }});
        },
        handleSliderChange: (e) => {
            dispatch({
                type: UPDATE_SLIDER,
                payload: e
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(App);
