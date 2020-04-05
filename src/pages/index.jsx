import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { Link } from "gatsby";
import PostListing from "../components/PostListing/PostListing";

import { createMarkup, format_date } from "../_helpers/helpers.js";

import "../styles/pagination.css";

class Home extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <div>
          <Helmet title={`Matthew Shields | Leeds based Web Developer`} />
          <div className="hero">
            <div className="hero__inner">
              <h1 className="hero__title" aria-label="Matthew Shields Web Developer" dangerouslySetInnerHTML={createMarkup(['Matthew Shields', 'Web Developer.',])} />
              <div className="hero__description">
                <p>Enjoying trying to keep up with the ever-changing development world, also manages the development team over at <a href="https://www.stickyeyes.com" target="_blank">Stickyeyes</a>.</p>
              </div>
            </div>
            <div className="hero__image">
              <Img fluid={data.fileName.childImageSharp.fluid} alt="Photo of Matthew Shields" />
            </div>
          </div>
          <div className="content-section">
            <h2>A little bit about me</h2>
            <p>I am based in Leeds, UK and apart from the obvious interest in dev, I am practicing photography, becoming a better cook and trying to get better at writing.</p>
            <p>As a developer I work across a spectrum of different projects including interactive creative pieces, full-site builds and API based tools. My current focuses are on learning React w/ Gatsby and improving my knowledge around building accessible web experiences.</p>
          </div>
          <div className="content-section">
            <h2>Recent Posts</h2>
            <p>As part of trying to get better at writing there's only one way and that's practice...</p>
                          
            <PostListing postEdges={data.allMarkdownRemark.edges} linkPage={true} displayReadingTime={true} />
            <div className="paging-container paging-container--central">
              <Link to="/writing/" className="paging-button">See more of my writing</Link>
            </div>
            
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;

export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "matthew-shields.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allMarkdownRemark(
      limit: 3,
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: {fileAbsolutePath: {regex: "/(content/writing)/.*\\.md$/"}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            short_description
            date
          }
        }
      }
    }
  }
`