import React from "react";
import * as firebase from "firebase/app";
import Loading from "../components/Loading";

const numPosts = 5;

export type PostType = {
  email: string;
  imageURL?: string;
  message: string;
  uid: string;
  date: string;
  likes?: {
    [key: string]: boolean;
  };
};

export type PostData = {
  id: string;
  value: PostType;
};

export type PostsContext = {
  posts: PostData[];
  pending?: boolean;
  numberOfPosts: number;
  fetchPosts: () => void;
};

const { Consumer, Provider } = React.createContext({
  posts: null,
  pending: true,
  numberOfPosts: numPosts,
  fetchPosts: () => {},
});

export { Consumer as PostsConsumer };

class PostsProvider extends React.Component<{}, PostsContext> {
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
      .limitToLast(this.state.numberOfPosts)
      .once("value")
      .then((snapshot) => {
        const data: { [id: string]: PostType } = snapshot.val();
        const posts = Object.entries(data)
          .map(([id, value]) => ({
            id,
            value,
          }))
          .slice(0)
          .reverse();

        this.setState({
          posts: posts,
          pending: false,
        });
      })
      .catch((error) => console.error({ error }));
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
      this.setState(
        { numberOfPosts: this.state.numberOfPosts + numPosts },
        this.fetchPosts
      );
    }
  };

  state = {
    posts: null,
    pending: true,
    numberOfPosts: numPosts,
    fetchPosts: this.fetchPosts,
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
