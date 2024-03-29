import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import 'fontawesome';
import { library, icon } from '@fortawesome/fontawesome-svg-core'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
library.add(faCamera)
//import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<Provider store={store}><App /></Provider>, 
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
