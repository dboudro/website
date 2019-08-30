import React from "react";
import ReactMarkdown from "react-markdown";

import "./Article.scss";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";

import GhostContentAPI from "@tryghost/content-api";
// import ContentLoader, { Facebook } from "react-content-loader";

const api = new GhostContentAPI({
  url: "https://loopring.ghost.io",
  key: "b19ddb3d08ecbf3eed7c737e17",
  version: "v2"
});

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, error: "" };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    api.posts
      .read({
        id: params.postId
      })
      .then(post => {
        this.setState({ post: post });
        console.log(post);
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: err });
      });
  }

  render() {
    const {
      match: { params }
    } = this.props;
    const html = this.state.post.html;
    return (
      <div>
        <Header />
        <section className="section section-hero-image">
          <figure className="image">
            <img draggable="false" src={this.state.post.feature_image} />
          </figure>
        </section>
        <section className="section section-article is-smallhas-background-white">
          <div className="columns is-centered">
            <div className="column is-6">
              <h1>{this.state.post.title}</h1>

              <div
                className="postWrapper"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Article;
