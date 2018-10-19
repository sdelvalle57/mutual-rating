import React, { Component } from 'react';
import { SHOW_ALL_RATINGS } from '../../ducks/ui';
import { RATE_AGENT } from '../../ducks/data';
import { GO_TO_RATING, GO_TO_HOME, CHANGE_MODAL, UPDATE_SLIDER } from '../../ducks/ui';
import store from '../../../store';
import Star from '../common/Star'
import Slider from '../common/Slider';
import Selector from '../common/Selector';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

const Header = withRouter(({ history }) => (
    <header className="App-header">
        <button className="btn btn-secondary left" onClick={() => { history.push('/User') }}>&larr; Back</button>
        <button className="btn btn-secondary right" onClick={() => { history.push('/User') }}>&#x2713; Rate</button>
    </header>
));

class App extends Component {
    componentDidMount() {
    }

    render() {
        // First we have to check if user is already loaded from server
        if(!this.props.currentAgent.name)
            return (<Redirect to='/' />)

        return (
            <div className="App col-lg-5 m-auto">
                <Modal {...this.props}/>
                <Header />
                <Star {...this.props}/>
            </div>
        );
    }
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        currentAgent: state.data.currentAgent,
        enrolled: state.data.enrolled,
        modal: state.ui.modal,
        user: state.data.user
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
