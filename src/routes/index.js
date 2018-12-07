import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import CustomRoute from './customRoute';
import MainLayout from '../layouts/mainLayout';
import LoginLayout from '../layouts/loginLayout';
import Login from '../containers/login';
import Error404 from '../containers/404';

class App extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <Switch>
        <CustomRoute exact path="/" layout={MainLayout} component={Login} />
        <CustomRoute exact path="/login" layout={LoginLayout} component={Login} />
        <CustomRoute exact path="/404" layout={MainLayout} component={Error404} />
        <CustomRoute layout={MainLayout} component={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}

export default App;
