import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Img from "gatsby-image";
import SEO from "../components/SEO/SEO";
import FlexibleContent from "../components/FlexibleContent/FlexibleContent";
import "./b16-tomorrow-dark.css";
import "./post.css";

import { createMarkup, format_date, format_paras } from "../_helpers/helpers.js";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    console.log(data);
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    let hero_class = 'hero hero--noimg';

    if(postNode.frontmatter.cover) {
      hero_class = 'hero';
    }

    return (
      <Layout>
        <div>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <div className={hero_class}>
            <div className="hero__inner">
              <h1 className="hero__title hero__title--post" dangerouslySetInnerHTML={createMarkup(post.title)} />
              <div className="hero__description">
                {format_paras(post.short_description)}
              </div>
            </div>
            {postNode.frontmatter.cover &&
              <div className="hero__image">
                <Img fluid={postNode.frontmatter.cover.childImageSharp.fluid} alt="" />
              </div>
            }
          </div>
          <div className="content-section post-content">
            <FlexibleContent sections={postNode.frontmatter.sections} />
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`

  fragment Carousel on Sections {
    type
    title
    text
    images {
      single_image
      alt
    }
  }

  fragment TextBlock on Sections {
    type
    title
    text
  }

  fragment BlockList on Sections {
    type
    title
    text
    blocks {
      title
      text
      footer_list {
        label
        value
      }
    }
  }

  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        short_description
        date
        cover {
          childImageSharp {
            fluid(maxHeight: 700, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sections {
          ...TextBlock
          ...Carousel
          ...BlockList
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
