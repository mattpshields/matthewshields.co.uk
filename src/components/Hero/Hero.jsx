import React from "react";
import Img from "gatsby-image";
import {
  createMarkup,
  format_paras,
  format_date,
} from "../../_helpers/helpers.js";

import "./Hero.css";
import "../../styles/post-meta.css";

class Hero extends React.Component {
  render() {
    let hero_class = "hero hero--noimg";

    if (this.props.cover) {
      hero_class = "hero";
    }

    let image_fluid = false;

    if (this.props.cover && this.props.cover.length === 1) {
      image_fluid = this.props.cover.childImageSharp.fluid;
    } else if (this.props.cover && this.props.cover.length > 1) {
      image_fluid = this.props.cover[0].photo.childImageSharp.fluid;
    } else {
      image_fluid = false;
    }

    return (
      <div className={hero_class}>
        <div className="hero__inner">
          <h1
            className="hero__title hero__title--post"
            dangerouslySetInnerHTML={createMarkup(this.props.title)}
          />
          <div className="hero__description">
            {format_paras(this.props.description)}
            {(this.props.date || this.props.readingTime) && (
              <footer aria-label="Post date" className="post-meta">
                {this.props.date && <p>{format_date(this.props.date)}</p>}
                {this.props.readingTime && (
                  <p>(Reading time: {this.props.readingTime} minutes)</p>
                )}
              </footer>
            )}
          </div>
        </div>
        {image_fluid && (
          <div className="hero__image">
            <Img fluid={image_fluid} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default Hero;
