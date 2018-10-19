import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import store from '../../../store';
import { INIT_UI } from '../../ducks/ui';
import './StartPage.css';

class StartPage extends Component {
    componentDidMount() {
        // Load data from server
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

export default StartPage;