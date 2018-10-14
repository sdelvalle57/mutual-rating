import React, { Component } from 'react';
import { INIT_UI } from './ducks/ui';
import {  } from './ducks/data';
import { SWITCH_VIEW, RATE_USER } from './ducks/ui';
import store from './../store';
import Star from './components/Main/Star';
import Slider from './components/Main/Slider';
import Selector from './components/Main/Selector';
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
        currentUser: state.ui.currentUser
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        handleForwardClick: (Hash) => {
            dispatch({
                type: RATE_USER,
                payload: Hash
            });
        },
        handleBackClick: () => {
            dispatch({
                type: SWITCH_VIEW, 
                payload: 'home'
            });
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(App);
