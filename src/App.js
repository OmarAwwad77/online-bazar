import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import Sign from './components/Sign/Sign';
import ReAuth from './components/ReAuth/ReAuth';
import SignOut from './components/SignOut/SignOut';
import AddItem from './components/AddItem/AddItem';


function App() {

  const routes = (
    <Fragment>
      <Route component={Sign} path="/sign" />
      <Route component={ReAuth} path="/re-auth" />
      <Route component={SignOut} path="/sign-out" />
      <Switch>
        <Route component={AddItem} path="/add-item" />
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