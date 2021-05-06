import React, { Component, PureComponent, Fragment  } from "react";
import Routes from "../routes";
import Header from "../components/layout/Header";
import { Provider } from "react-redux";
import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from '../components/layout/Alerts';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { loadUser } from '../actions/auth';
import store from "../store/store";
import Login from "../components/users/Login";

const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}> 
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
        <Fragment>
          <Header />
          <Alerts />
            <Routes />
        </Fragment>
        </Router>
      </AlertProvider>
      </Provider>
    );
  }
}

export default App;
