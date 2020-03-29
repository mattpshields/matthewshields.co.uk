import React from "react";
import TextBlock from "../TextBlock/TextBlock";

class SectionSelector extends React.Component {

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
    let section = this.props.section;
    return (
      <div>
        {this.choose_section(section)}
      </div>
    );
  }
}

export default SectionSelector;
