import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import CustomRoute from './customRoute';
import MainLayout from '../layouts/mainLayout';
import LoginLayout from '../layouts/loginLayout';
import Login from '../containers/login';
import Signup from '../containers/signup';
import Home from '../containers/home';
import StoreDetails from '../containers/storeDetails';
import Error404 from '../containers/404';

class App extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <Switch>
        <CustomRoute exact path="/" layout={MainLayout} component={Home} />
        <CustomRoute exact path="/store/:id" layout={MainLayout} component={StoreDetails} />
        <CustomRoute exact path="/login" layout={LoginLayout} component={Login} />
        <CustomRoute exact path="/sign-up" layout={LoginLayout} component={Signup} />
        <CustomRoute exact path="/404" layout={MainLayout} component={Error404} />
        <CustomRoute layout={MainLayout} component={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}

export default App;
