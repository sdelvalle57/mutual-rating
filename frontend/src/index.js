import React from 'react';
import { render } from 'react-dom';
import App from './App_content/App';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './bootstrap.css'; // Using Bootstrap css, for reference visit https://bootswatch.com/materia/

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
