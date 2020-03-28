import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";

import "./about.css";

import { createMarkup, format_paras } from "../_helpers/helpers.js";

class AboutPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <div>
          <Helmet title={`About | ${config.siteTitle}`} />
          <div className="hero">
            <div className="hero__inner">
              <h1 className="hero__title" dangerouslySetInnerHTML={createMarkup('About Me')} />
              <div className="hero__description">
                <p>I am lead developer over at <a href="https://www.stickyeyes.com" target="_blank">Stickyeyes</a>, managing a team of developers and testers and love coding and figuring problems out.</p>
              </div>
            </div>
            <div className="hero__image">
              <Img fluid={data.fileName.childImageSharp.fluid} alt="" />
            </div>
          </div>
          
          <div className="content-section">
            <h2>My career so far</h2>
            <p>After graduating from Leeds College of Art in 2012 specialising in Graphic Design, I quickly started at Stickyeyes as a Junior Designer. A year or so after with a growing love for coding (teaching myself in my spare time), I moved over to the development side of the team. Eight years later and I am still at Stickyeyes having worked my way through to Lead Developer now managing the development team.</p>
            <p>I have worked at every level of our development team and love bringing this range of experience to help guide my team of developers and testers. This helps us when working across a huge range of creative and technical projects with the wider Design and Development team.</p>
          </div>
          
          <div className="content-section">
            <h2>My skillsets</h2>
            <p>One of my biggest strengths as a developer has always been my ability to take on a challenge.</p>
            <p><strong>Creative Development</strong> – One of my favourite things to work on is a creative challenge when creating PR campaigns for our clients. Whether that has been using the Twitter API, creating 3D globe cartograms or inventing interactive games I really like the variety and learning new skills from each of them.</p>
            <p><strong>WordPress Development</strong> – I have used WordPress as the basis for my content managed builds throughout my career, and am highly skilled at creating bespoke highly performant, secure solutions using this platform. I am looking to bring my Gutenberg experience up to this level too.</p>
            <p><strong>Internal Tool Builds</strong> – Optimising processes is something that I feel passionate about. Over the years when I've seen processes where I think I can help I have created tools and scripts to accumatively save hundreds of work hours letting people get back to using their expert skills on the next task at hand.</p>
          </div>

          {data.allMarkdownRemark.edges.length > 0 ? (
            <div className="content-section">
              <h2>Highlights of projects I've worked on</h2>
              <p>They might be one of my favourite projects because of the results, the challenge of doing them or even just because they were a lot of fun!</p>
              <p>Agency life means that I can't always name names with a lot of the projects that I have worked on, however the below gets straight to the detail, which is the interesting part anyway.</p>
              {data.allMarkdownRemark.edges.map(project => (
                <div key={project.node.frontmatter.title} className="project-list__single">
                  <h3 className="project-list__title">{project.node.frontmatter.title}</h3>
                  { format_paras(project.node.frontmatter.description) }

                  {project.node.frontmatter.options.length > 0 ? (
                    <ul className="options-list">
                      {project.node.frontmatter.options.map(option => (
                        <li key={option.label}>
                          <span className="options-list__label">{option.label}:</span>
                          <span className="options-list__value">{option.value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : false}
                </div>
              ))}
            </div>
          ) : false }
          
          <div className="content-section">
            <h2>Talking Experience</h2>
            <div className="project-list__single">
              <h3 className="project-list__title">40x40 Design – 'Dev is part of the design process'</h3>
              <p>I took part in 40x40.design, a sell-out event organised by my team for Leeds Digital Festival; An event consisting of forty two minute talks by 40 designers. Or more precisely, 39 designers and 1 developer. I talked about how designers and developers can work together better – this was a hugely positive experience.</p>
              <p><a href="https://youtu.be/ZWcRQ--08cA?t=2177" target="_blank">Watch on Youtube</a></p>
            </div>
          </div>

        </div>
      </Layout>
    );
  }
}

export default AboutPage;

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
      filter: {fileAbsolutePath: {regex: "/(project)/.*\\.md$/"}}
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            description
            options {
              label
              value
            }
          }
        }
      }
    }
  }
`