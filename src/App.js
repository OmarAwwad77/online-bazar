import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import notFound from './components/404';

function App() {

  const routes = (
    <Switch>/>
      <Route component={Main} path="/" exact />
      <Route component={notFound} />
    </Switch>
  );
  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;