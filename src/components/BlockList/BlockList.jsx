import React from "react";

import { createMarkup, format_paras } from "../../_helpers/helpers.js";

class BlockList extends React.Component {
  render() {
    return (
      <div className="content-section">
        <h2>{this.props.title}</h2>
        {format_paras(this.props.text)}

        {this.props.blocks.map(block => (
          <div key={block.title} className="project-list__single">
            <h3 className="project-list__title">{block.title}</h3>
            { format_paras(block.text) }

            {block.footer_list > 0 ? (
              <ul className="options-list">
                {block.footer_list.map(option => (
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
    );
  }
}

export default BlockList;
