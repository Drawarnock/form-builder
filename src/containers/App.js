import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Landing from '../components/Landing/Landing';
import Dashboard from '../containers/Dashboard/Dashboard';
import NewForm  from './NewForm/NewForm';
import GeneratedForm from '../components/GeneratedForm/GeneratedForm'

// import { initDB } from '../indexedDB';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path="/" exact  component={Landing} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/new-form" exact component={NewForm} />
        <Route path="/dashboard/form/:id" component={GeneratedForm} />
      </div>
    );
  }
}

export default App;
