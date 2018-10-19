import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../../store';
import { INIT_UI } from '../../ducks/ui';
import './StartPage.css';

class StartPage extends Component {
    componentDidMount() {
        store.dispatch({type: INIT_UI});
    }

    render() {
        return (
            <div className="start-page">
                <h1 className="start-page-header">Hold up ! Looking if you already exist in the DNA.</h1>
                <div className="start-page-summary-spinner">
                    <Loader type="TailSpin" color="#01a2eb" height={80} width={80} />
                </div>
            </div>

        );
    }
}

// Mapping of Redux state to Component's props
const mapStateToProps = ( state ) => {
    return {
        loading: state.ui.loading,
        currentAgent: state.data.currentAgent
    }
};

// Functions dispatching Redux actions for later consumption by middleware and reducers
// Those functions are passed to Component as props with help of connect() below
const mapDispatchToProps = ( dispatch ) => {
    return {
        method1: () => {
            
        }
    }
}

// Actual maping of Redux components to React props for "Main" component
export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(StartPage);