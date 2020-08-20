import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Ribbon from './test';
import * as serviceWorker from './serviceWorker';


  // <React.StrictMode>
    // <App />
  // </React.StrictMode>,
  //document.getElementById('root')
     //ReactDOM.render(<App />, document.getElementById("root"));
   ReactDOM.render(<Ribbon />, document.getElementById("root123"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
