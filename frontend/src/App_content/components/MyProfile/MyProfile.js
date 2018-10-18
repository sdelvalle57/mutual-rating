import React, { Component } from 'react';
import { GO_TO_RATING, CHANGE_MODAL } from '../../ducks/ui';
import Star from '../common/Star'
import Selector from '../common/Selector';
import Modal from '../common/Modal';
import List from '../common/List';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
                <header className="App-header"></header>
                <Selector {...this.props}/>
                <Star {...this.props}/>
                <List {...this.props.currentAgent}/>
                
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
        closeModal: () => {
            dispatch({type: CHANGE_MODAL, payload: {
                isShowing: false,
                text: ''
            }});
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(App);
