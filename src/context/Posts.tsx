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
    window.addEventListener("scroll", this.handleScroll);
    this.fetchPosts();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("bottom");
    }
  };

  render() {
    const { pending, posts } = this.state;

    if (pending) {
      return <Loading />;
    }

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default PostsProvider;
