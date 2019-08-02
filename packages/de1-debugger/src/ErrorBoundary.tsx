import React from "react";
import { message } from "antd";

export default class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    console.error(error);
    message.error("An error occured. Please check the console.");
  }

  render() {
    return this.props.children;
  }
}
