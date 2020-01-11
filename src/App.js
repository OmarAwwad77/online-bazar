import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {

  const routes = (
    <Switch>/>
      <Route render={() => null} />
    </Switch>
  );
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
