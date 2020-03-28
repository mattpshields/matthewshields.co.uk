import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Img from "gatsby-image";
import "./album.css";
// import Gallery from "../components/Gallery/Gallery";
import Loadable from 'react-loadable';

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

function createMarkup(string) {
  let title = wrapWords(string);
  return {__html: title};
}

const LoadableBar = Loadable({
  loader: () => import('../components/Gallery/Gallery'),
  loading() {
    return <div>Loading...</div>
  }
});

export default class PostTemplate extends React.Component {
  
  constructor(props) {
      super(props);

      this.state = {
        in_browser: false
      }

      // this.fetch_book = this.fetch_book.bind(this);
  }

  lock_down_scroll() {
    // if(in_view) {
    //   document.body.classList.add("no-scroll");
    // }
  }

  open_scroll() {
    // document.body.classList.remove("no-scroll");
  }

  componentDidMount() {

    if (typeof window !== 'undefined') {
      this.setState({
        in_browser: true,
        gallery_width: window.innerWidth - 80
      });
    }

  }

  render() {
    const { data, pageContext } = this.props;
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

    if(postNode.frontmatter.cover_images && postNode.frontmatter.cover_images.length > 0) {
      hero_class = 'hero';
    }

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <div className={hero_class}>
            <div className="hero__inner">
              <h1 className="hero__title hero__title--post" dangerouslySetInnerHTML={createMarkup(post.title)} />
              <div className="hero__description" dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </div>
            {postNode.frontmatter.cover_images && postNode.frontmatter.cover_images.length > 0 &&
              <div className="hero__image">
                <Img fluid={postNode.frontmatter.cover_images[0].photo.childImageSharp.fluid} alt="" />
              </div>
            }
          </div>

          {this.state.in_browser &&
            <LoadableBar images={postNode.frontmatter.images} />
          }

        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query AlbumPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        cover_images {
          photo {
            childImageSharp {
              fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
        images {
          photo {
            childImageSharp {
              grid:fluid(maxWidth: 450, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
              nongrid:fluid(maxHeight: 700, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
      }
    }
  }
`;
