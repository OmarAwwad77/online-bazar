import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import notFound from './components/404';
import Sign from './components/Sign/Sign';

function App() {

  const routes = (
    <Fragment>
      <Route component={Sign} path="/sign" />
      <Switch>
        <Route component={Main} path="/" />
        <Route render={(props) => (props.history.push("/notfound"))} />
      </Switch>

    </Fragment>
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