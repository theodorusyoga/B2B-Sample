import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import CustomRoute from './customRoute';
import MainLayout from '../layouts/mainLayout';
import Login from '../containers/login';

class App extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <Switch>
        <CustomRoute exact path="/" layout={MainLayout} component={Login} />
        <CustomRoute layout={MainLayout} component={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}

export default App;
