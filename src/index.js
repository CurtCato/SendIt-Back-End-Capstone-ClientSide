import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Home from './Components/Home'
import './index.css';


ReactDOM.render(
    <Router>
        <Home />
    </Router>
    , document.getElementById('root'))