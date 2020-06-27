import React from "react";
import * as firebase from "firebase/app";
import Loading from "../components/Loading";

export type PostType = {
  [key: string]: {
    email: string;
    message: string;
    uid: string;
  };
};

export type PostsContext = {
  posts: PostType;
  pending?: boolean;
};

const { Consumer, Provider } = React.createContext({
  posts: null,
});

export { Consumer as PostsConsumer };

class PostsProvider extends React.Component<{}, PostsContext> {
  state = {
    posts: null,
    pending: true,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("posts")
      .orderByKey()
      .once("value")
      .then((snapshot) => {
        this.setState({
          posts: snapshot.val(),
          pending: false,
        });
      })
      .catch((error) => console.warn({ error }));
  };

  render() {
    const { pending } = this.state;

    if (pending) {
      return <Loading />;
    }

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default PostsProvider;
