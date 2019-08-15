import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useConnection from "./hooks/de1/useConnection";
import useAutoConnect from "./hooks/de1/useAutoConnect";
import ErrorBoundary from "./ErrorBoundary";
import UserApp from "./pages/UserApp";
import Lab from "./pages/Lab";
import Dashboard from "./pages/Dashboard";
import AppMenu from "./components/App/Menu";
import "./App.css";

const App: React.FC = () => {
  const [isConnected, connect] = useConnection();
  useAutoConnect(isConnected, connect);

  return (
    <Router>
      <ErrorBoundary>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout.Content style={{ paddingBottom: 64 }}>
            <Route
              path="/"
              exact
              render={() => <Redirect from="/" to="lab" />}
            />
            <Route
              path="/app/"
              render={props => <UserApp {...props} isConnected={isConnected} />}
            />
            <Route
              path="/lab/"
              render={props => <Lab {...props} isConnected={isConnected} />}
            />
            <Route
              path="/dashboard/"
              render={props => (
                <Dashboard {...props} isConnected={isConnected} />
              )}
            />
          </Layout.Content>

          <AppMenu isConnected={isConnected} />
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
