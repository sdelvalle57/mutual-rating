import React from 'react';
// import button from './button.jpg';
import logo from './logo.svg';

class Main extends React.Component {
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


/*
ReactDOM.render(
  <input type="image" id="submitbutton" src={button} />,
  document.getElementById('submit')
);
*/

export default Main;
