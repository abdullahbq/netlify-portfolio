import React from "react";
import { DiscussionEmbed, CommentCount } from "disqus-react";
import { SimpleShareButtons } from "react-simple-share";
import "./index.scss";

export default class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.data.markdownRemark
    };
  }
  render() {
    const disqusShortname = "iamtimsmith";
    const disqusConfig = {
      url: `https://www.iamtimsmith.com/blog/${
        this.state.post.frontmatter.path
      }`,
      identifier: this.state.post.frontmatter.path,
      title: this.state.post.frontmatter.title
    };
    return (
      <div id="blog-post">
        <section
          className="hero is-large"
          style={{
            backgroundImage: `url("${this.state.post.frontmatter.image}")`
          }}
        >
          <div className="hero-body container" />
        </section>
        <section className="section">
          <div className="container">
            <h1 className="is-size-1">{this.state.post.frontmatter.title}</h1>
            <div className="columns">
              <div className="column is-narrow">
                <p className="is-size-5">{this.state.post.frontmatter.date}</p>
              </div>
              <div className="column">
                <SimpleShareButtons color="#ccc" size="30px" />
              </div>
            </div>

            <hr />
            <br />
            <div
              id="post-content"
              dangerouslySetInnerHTML={{ __html: this.state.post.html }}
            />
            <div className="has-text-centered">
              Share this article:
              <SimpleShareButtons color="#222" size="50px" />
            </div>
            <br />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </section>
      </div>
    );
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        image
        tags
      }
    }
  }
`;
