import React, { Component } from 'react';
import LoginComponent from './login/LoginComponent';
import HomeComponent from './home/HomeComponent';
import LoginRoute from './LoginRoute';
import AuthenticatedRoute from './AuthenticatedRoute';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class TaskitApp extends Component {
  render() {
    return (
      <div className="TaskitApp">
        <Router>
          <>
            <Switch>
              <LoginRoute path="/" exact component={LoginComponent}/>
              <LoginRoute path="/login" component={LoginComponent}/>
              <AuthenticatedRoute path="/home" component={HomeComponent}/>     
              <Route component = {ErrorComponent}/>
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

function ErrorComponent() {
  return <div>An Error occurred.</div>
}

export default TaskitApp;
