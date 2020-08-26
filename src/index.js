import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Ribbon from './test';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Ribbon />, document.getElementById('root123'));

serviceWorker.unregister();
