import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import MyProfile from './components/MyProfile/MyProfile';
import SignUp from './components/SignUp/SignUp';
import Rate from './components/Rate/Rate';
import User from './components/User/User';
import './App.css';

class App extends Component {
    render() {

        return (
            <HashRouter>
                <Switch>
                    {/*<Route exact path='/' render={() => (<Redirect to='/signup' />)} />*/}
                    <Route exact path='/' component={StartPage}/>
                    <Route exact path='/SignUp/' component={SignUp} />
                    <Route exact path='/MyProfile/' component={MyProfile} />
                    <Route exact path='/Rate/:userName' component={Rate} />
                    <Route exact path='/User/:userName' component={User} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;