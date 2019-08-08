import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Layout, Menu } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import UserApp from "./pages/UserApp";
import Dashboard from "./pages/Dashboard";
import Connection from "./components/Connection";
import "./App.css";

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Router>
      <ErrorBoundary>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout.Content style={{ paddingBottom: 64 }}>
            <Route
              path="/"
              exact
              render={props => <Redirect from="/" to="app" />}
            />
            <Route
              path="/app/"
              render={props => <UserApp {...props} isConnected={isConnected} />}
            />
            <Route
              path="/dashboard/"
              render={props => (
                <Dashboard {...props} isConnected={isConnected} />
              )}
            />
          </Layout.Content>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            style={{
              lineHeight: "64px",
              position: "fixed",
              bottom: 0,
              zIndex: 1,
              width: "100%"
            }}
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Link to="/app">App</Link>
            </Menu.Item>
            <Menu.Item key="dashboard">
              <Link to="/dashboard/">Dashboard</Link>
            </Menu.Item>
          </Menu>
          <Connection onChange={v => setIsConnected(v)} />
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
