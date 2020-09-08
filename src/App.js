import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './components/css/custom.css';

import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import About from './components/About.js'
import Main from './components/dashboard/Main.js'
import Scoreboard from './components/dashboard/Scoreboard'
import Subscribe from './components/dashboard/Subscribe';
import History from './components/dashboard/History';
import Predict from './components/dashboard/Predict';
import EditPredict from './components/dashboard/EditPredict';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true}  path="/home" component={Home}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/register" component={Register}/>
        <Route exact={true} path="/about" component={About}/>
        <Route exact={true} path="/dashboard" component={Main}/>
        <Route exact={true} path="/dashboard/home" component={Main}/>
        <Route exact={true} path="/dashboard/scoreboard" component={Scoreboard}/>
        <Route exact={true} path="/dashboard/subscribe" component={Subscribe}/>
        <Route exact={true} path="/dashboard/history" component={History}/>
        <Route exact={true} path="/dashboard/predict/edit" component={EditPredict}/>
        <Route exact={true} path="/dashboard/predict/new" component={Predict}/>
      </Switch>
      </Router>
  );
}

export default App;
