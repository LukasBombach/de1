import React from "react";
import { Layout } from "antd";
import useAutoConnect from "./hooks/de1/useAutoConnect";
import ErrorBoundary from "./ErrorBoundary";
import Routes from "./Routes";
import AppMenu from "./components/App/Menu";

const App: React.FC = () => {
  useAutoConnect();

  return (
    <ErrorBoundary>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Content style={{ paddingBottom: 64 }}>
          <Routes />
        </Layout.Content>
        <AppMenu />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
