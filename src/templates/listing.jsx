import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { Link } from "gatsby";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import "./listing.css";

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

function createMarkup(string) {
  let title = wrapWords(string);
  return {__html: title};
}

class Listing extends React.Component {
  renderPaging() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/writing/" : `/writing/${currentPageNum - 1}/`;
    const nextPage = `/writing/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;

    return (
      <div className="paging-container">
        {!isFirstPage && <Link to={prevPage}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? "/writing/" : `/writing/${pageNum}/`}
            >
              {pageNum}
            </Link>
          );
        })}
        {!isLastPage && <Link to={nextPage}>Next</Link>}
      </div>
    );
  }

  render() {
    const data = this.props.data;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const { currentPageNum, pageCount } = this.props.pageContext;
    const isFirstPage = currentPageNum === 1;

    return (
      <Layout>
        <div>
          <Helmet title={`Writing | Matthew Shields | Leeds based Web Developer`} />
          {isFirstPage && (
            <div className=" hero--noimg">
              <div className="hero__inner">
                <h1 className="hero__title" dangerouslySetInnerHTML={createMarkup('Writing')} />
                <div className="hero__description">
                  <p>I've spent many years learning so much through reading peoples blogs, it's time for me to give back and contribute.</p>
                </div>
              </div>
            </div>
          )}
          <div className="content-section">
            <div className="posts-container">
              <PostListing postEdges={postEdges} linkPage={true} displayReadingTime={true} />
            </div>
            {/* {this.renderPaging()} */}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fileAbsolutePath: {regex: "/(content)/.*\\.md$/"}}
      limit: $limit
      skip: $skip
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
            short_description
            date
          }
        }
      }
    }
  }
`;
