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
    firebase
      .database()
      .ref("posts")
      .on(
        "value",
        (snapshot) => {
          this.setState({
            posts: snapshot.val(),
            pending: false,
          });
        },
        (error: Error) => console.warn({ error })
      );
  }

  render() {
    const { pending, posts } = this.state;

    if (pending) {
      return <Loading />;
    }
    console.log(posts);

    return (
      <Provider
        value={{
          posts,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default PostsProvider;
