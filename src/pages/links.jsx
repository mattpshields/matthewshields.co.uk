import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import PostListing from "../components/PostListing/PostListing";
import "./photography.css";

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

function createMarkup(string) {
  let title = wrapWords(string);
  return {__html: title};
}

class Home extends Component {
  render() {
    const { data } = this.props;
    const postEdges = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout>
        <div>
          <Helmet title={`Links | Matthew Shields | Leeds based Web Developer`} />
          <div className="hero--noimg">
            <div className="hero__inner">
              <h1 className="hero__title" dangerouslySetInnerHTML={createMarkup('Cool Links')} />
              <div className="hero__description">
                <p>People share cool things that they create everyday, here are some of the highlights that I have come across for you to check out too.</p>
              </div>
            </div>
          </div>
          <div className="content-section">
            <PostListing postEdges={postEdges} linkPage={false} displayReadingTime={false} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/(links)/.*\\.md$/"}}
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            link_url
            short_description
            date
          }
        }
      }
    }
  }
`