import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TrelloBoard from "../components/BoardPage/Board";
import BoardsList from "../components/BoardListPage/Dashboard"
import PrivateRoute from '../components/common/PrivateRoute';

import Login from "../components/users/Login";
import Register from "../components/users/Register";

const AppRouter = () => {
  return (
          <div>
            <Switch>
              <PrivateRoute exact path="/" component={BoardsList} />
              <PrivateRoute path="/board/:boardID" component={TrelloBoard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
  );
};

export default AppRouter;
