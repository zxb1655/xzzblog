import React from 'react';
import './App.less';
import {Route, Switch,Redirect} from 'react-router-dom'
import Admin from './containers/admin/admin'
import Login from './containers/login/login'

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/admin" component={Admin}></Route>
      <Redirect to="/admin"/>
    </Switch>
  </div>
);

export default App;