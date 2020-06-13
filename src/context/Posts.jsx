import React from "react";
import * as firebase from "firebase/app";

const { Consumer, Provider } = React.createContext({
  posts: null,
  pending: true,
});

export { Consumer as PostsConsumer };

class PostsProvider extends React.Component {
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
        snapshot => {
          this.setState({
            posts: snapshot.val(),
            pending: false,
          });
        },
        error => console.warn({ error })
      );
  }

  render() {
    const { pending, posts } = this.state;

    console.log({ posts });

    if (pending) {
      return <>Loading...</>;
    }

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
