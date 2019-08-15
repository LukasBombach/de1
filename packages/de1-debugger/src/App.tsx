import React from "react";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import useAutoConnect from "./hooks/de1/useAutoConnect";
import ErrorBoundary from "./ErrorBoundary";
import Routes from "./Routes";
import AppMenu from "./components/Layout/AppMenu";

const App: React.FC = () => {
  useAutoConnect();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout.Content style={{ paddingBottom: 64 }}>
            <Routes />
          </Layout.Content>
          <AppMenu />
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
