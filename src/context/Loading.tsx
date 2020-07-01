import React from "react";
import Loading from "../components/Loading";

export type LoadingContext = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const LoadingContext = React.createContext({} as LoadingContext);
const { Consumer, Provider } = LoadingContext;
export { Consumer as LoadingConsumer };

class LoadingProvider extends React.Component<{}, LoadingContext> {
  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  state = {
    isLoading: false,
    setIsLoading: this.setIsLoading,
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default LoadingProvider;
