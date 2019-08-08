import React from "react";
import { Button, message } from "antd";

export default class ErrorBoundary extends React.Component {
  state = { error: false };

  componentDidCatch(error: Error) {
    console.error(error);
    message.error("An error occured. Please check the console.");
    this.setState({ error: true });
  }

  render() {
    return this.state.error ? (
      <Button onClick={() => this.setState({ error: false })}>Reset</Button>
    ) : (
      this.props.children
    );
  }
}
