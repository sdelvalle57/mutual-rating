import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import logo from './logo.svg';
import './App.css';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 class="right">
            <p>8.0 <br /> <p id="text">Your<br />Rating</p></p>
          </h2>
          <img src={logo} className="App-logo" alt="logo" />
          <h2 class="left">
            <p>9.0<br /> <p id="text">Community<br />Rating</p></p>
          </h2>
          <p>
            How would you rate this user?
          </p>
        </header>
      </div>
    );
  }
}

export default App;
