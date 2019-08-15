import React from "react";
import { Route, Redirect } from "react-router-dom";
import App from "./pages/App";
import Lab from "./pages/Lab";
import Dashboard from "./pages/Dashboard";

const Routes: React.FC = () => (
  <>
    <Route path="/" exact render={() => <Redirect from="/" to="app" />} />
    <Route path="/app/" component={App} />
    <Route path="/lab/" component={Lab} />
    <Route path="/dashboard/" component={Dashboard} />
  </>
);

export default Routes;
