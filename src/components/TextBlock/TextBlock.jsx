import React from "react";

import { createMarkup, format_paras } from "../../_helpers/helpers.js";

class TextBlock extends React.Component {
  render() {
    return (
      <div className="content-section">
        <h2>{this.props.title}</h2>
        {format_paras(this.props.text)}
      </div>
    );
  }
}

export default TextBlock;
