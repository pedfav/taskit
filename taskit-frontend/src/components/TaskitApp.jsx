import React, { Component } from 'react';
import LoginComponent from './login/LoginComponent';
import HomeComponent from './home/HomeComponent';
import LoginRoute from './common/LoginRoute';
import AuthenticatedRoute from './common/AuthenticatedRoute';
import { createBrowserHistory } from 'history'
import SignUpComponent from './signup/SignUpComponent';
import { Router, Switch, Route } from "react-router-dom";

const history = createBrowserHistory(); 

class TaskitApp extends Component {
  render() {
    return (
      <div className="TaskitApp">
        <Router history={history}>
            <Switch>
              <LoginRoute path="/" exact component={LoginComponent}/>
              <LoginRoute path="/login" component={LoginComponent}/>
              <Route path="/signup" component={SignUpComponent}/>
              <AuthenticatedRoute path="/home" component={HomeComponent}/>     
              <Route component = {ErrorComponent}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

function ErrorComponent() {
  return <div>An Error occurred.</div>
}

export default TaskitApp;
