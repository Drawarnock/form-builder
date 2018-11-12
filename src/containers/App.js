import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Landing from '../components/Landing/Landing';
import Dashboard from '../containers/Dashboard/Dashboard';
import NewForm  from './NewForm/NewForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact  component={Landing} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/new-form" component={NewForm} />
      </div>
    );
  }
}

export default App;
