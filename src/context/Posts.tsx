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
  referenceToOldestKey?: string;
};

const { Consumer, Provider } = React.createContext({
  posts: null,
  pending: true,
  referenceToOldestKey: "",
});

export { Consumer as PostsConsumer };

class PostsProvider extends React.Component<{}, PostsContext> {
  state = {
    posts: null,
    pending: true,
    referenceToOldestKey: "",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.fetchPosts();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchPosts = () => {
    if (!this.state.referenceToOldestKey) {
      firebase
        .database()
        .ref("posts")
        .orderByKey()
        .limitToLast(5)
        .once("value")
        .then((snapshot) => {
          const arrayOfKeys = Object.keys(snapshot.val()).sort().reverse();
          this.setState({
            posts: snapshot.val(),
            pending: false,
            referenceToOldestKey: arrayOfKeys[arrayOfKeys.length - 1],
          });
        })
        .catch((error) => console.error({ error }));
    } else {
      firebase
        .database()
        .ref("posts")
        .orderByKey()
        .endAt(this.state.referenceToOldestKey)
        .limitToLast(6)
        .once("value")
        .then((snapshot) => {
          const arrayOfKeys = Object.keys(snapshot.val())
            .sort()
            .reverse()
            .slice(1);
          this.setState({
            posts: snapshot.val(),
            pending: false,
            referenceToOldestKey: arrayOfKeys[arrayOfKeys.length - 1],
          });
          console.log(this.state);
        })
        .catch((error) => console.error({ error }));
    }
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
      this.fetchPosts();
      console.log("bottom");
    }
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
