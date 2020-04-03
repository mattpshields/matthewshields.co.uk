import React from "react";
import TextBlock from "../TextBlock/TextBlock";

class FlexibleContent extends React.Component {

  choose_section(section) {
    switch(section.type) {
      case 'text-block':
        return (
          <TextBlock title={section.title} text={section.text} />
        )
        break;
      default:
        // code block
    }
  }

  render() {
    let sections = this.props.sections;
    return (
      <div>
        {sections.map((section, index) => (
          <div key={section.type+'_'+index}>
            {this.choose_section(section)}
          </div>
        ))}
      </div>
    );
  }
}

export default FlexibleContent;
