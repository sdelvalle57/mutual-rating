import React, { Component } from 'react';
import { INIT_UI } from './ducks/ui';
import store from './../store';
import Main from './components/Main/Main';
import Slider from './components/Main/Slider';
import './App.css';

class App extends Component {
    componentDidMount() {
        store.dispatch({type: INIT_UI});
    }

    render() {
        return (
            <div>
                <Main/>
                <Slider/>
            </div>
        );
    }
}

export default App;
