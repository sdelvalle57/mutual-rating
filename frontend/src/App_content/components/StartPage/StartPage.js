import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import store from './../store';
import { INIT_UI } from './ducks/ui';

class StartPage extends Component {
    componentDidMount() {
        // Load data from server
        store.dispatch({type: INIT_UI});
    }

    render() {
        return (<div className="summary-spinner"><Loader type="TailSpin" color="#01a2eb" height={80} width={80} /></div>);
    }
}

export default StartPage;