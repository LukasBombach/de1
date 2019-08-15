import React from "react";
import { message } from "antd";

interface Props {}
interface State {
  errorCount: number;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = { errorCount: 0 };

  componentDidCatch(error: Error) {
    console.error(error);
    message.error("An error occured. Please check the console.");
    this.setState(({ errorCount }) => ({ errorCount: ++errorCount }));
  }

  render() {
    return (
      <React.Fragment errorCount={this.state.errorCount}>
        {this.props.children}
      </React.Fragment>
    );
  }
}
