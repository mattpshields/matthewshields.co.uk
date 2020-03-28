import React, { Component } from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";

import "./about.css";

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span aria-hidden='true'>$&</span>");
}

function createMarkup(string) {
  let title = wrapWords(string);
  return {__html: title};
}

function format_paras(text) {
  let newText = text.split ('\n').map ((item, i) => (item) ? <p key={i}>{item}</p> : '');
  return newText;
}

class AboutPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Layout>
        <div>
          <Helmet title={`Setup | Matthew Shields | Leeds based Web Developer`} />
          <div className="hero">
            <div className="hero__inner">
              <h1 className="hero__title" dangerouslySetInnerHTML={createMarkup('Setup')} />
              <div className="hero__description">
                <p>I always like to find out what setups, editors and extensions other people are using.</p>
                <p>Here are mine!</p>
              </div>
            </div>
            <div className="hero__image">
              <Img fluid={data.fileName.childImageSharp.fluid} alt="" />
            </div>
          </div>
          
          <div className="content-section">
            <h2>VS Code: My editor of choice</h2>
            <p>Absolutely loving the VS Code Editor for the past year or so, it is highly configurable, works fantastically, no more Git integration memory issues and fantastic eco system of extensions, though I always try to keep it light.</p>
            <p>Speaking of which, some extensions I would recommend are:</p>
            <ul>
              <li><strong>Git Blame</strong> (even though I have issues with the name)</li>
              <li><strong>Duplicate Action</strong></li>
              <li><strong>Prettier – Code Formatter</strong></li>
              <li><strong><a href="https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack" target="_blank">Live Share</a></strong></li>
              <li><strong><a href="https://github.com/vsls-contrib/codetour" target="_blank">Code Tour</a></strong> (a new addition but loving it so far)</li>
              <li><strong>Docker Explorer</strong></li>
            </ul>
          </div>
          
          <div className="content-section">
            <h2>Browser Extensions</h2>
            <p>As web developers we spend our days in our browsers, actually who doesn't. Here are some of the helpful tools that I use to improve my developer experience in mine.</p>
            <ul>
              <li><strong><a href="https://github.com/maximelebreton/quick-javascript-switcher" target="_blank">Quick Javascript Switcher</a></strong> (Lets remember to check none JS views)</li>
              <li><strong><a href="https://www.loom.com/" target="_blank">Loom – Video Recorder</a></strong></li>
              <li><strong><a href="https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna" target="_blank">GA Debug</a></strong></li>
              <li><strong><a href="https://siteimprove.com/" target="_blank">Siteimprove Accessibility Checker</a></strong></li>
              <li><strong><a href="https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd" target="_blank">Axe – Web Accessibility Testing</a></strong></li>
              <li><strong><a href="https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa" target="_blank">JSON Formatter</a></strong></li>
              <li><strong><a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" target="_blank">React Developer Tools</a></strong></li>
            </ul>
          </div>
          
          <div className="content-section">
            <h2>Software and Tools</h2>
            <p>Not everything that we do is in browser, here are some of the softwares that I use. I am on macOS so some of these may be just for the Apple customers out there.</p>
            <ul>
              <li><strong><a href="https://www.gocd.org/" target="_blank">GoCD</a></strong> – open source continous deployment server</li>
              <li><strong><a href="https://git-fork.com/" target="_blank">Fork</a></strong> – really nice lightweight git GUI</li>
              <li><strong><a href="https://imageoptim.com/" target="_blank">Imageoptim</a></strong> – powerful and handy tool for bulk image optimisations</li>
              <li><strong><a href="https://evernote.com/" target="_blank">Evernote</a></strong> – I need help to keep all my notes organised and find this perfect</li>
              <li><strong><a href="https://www.postman.com/" target="_blank">Postman</a></strong> – when working with APIs I love using Postman to explore endpoints</li>
              <li><strong><a href="https://www.sequelpro.com/" target="_blank">Sequel Pro</a></strong> – free software for database management</li>
              <li><strong><a href="https://www.spectacleapp.com/" target="_blank">Spectacle</a></strong> – the most used app on my machine perfect for window management</li>
            </ul>
          </div>

        </div>
      </Layout>
    );
  }
}

export default AboutPage;

export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "writing.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`