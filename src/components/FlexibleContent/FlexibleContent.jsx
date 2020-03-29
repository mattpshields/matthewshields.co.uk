import React from "react";
import SectionSelector from "./SectionSelector";

class FlexibleContent extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        url: postEdge.node.frontmatter.link_url,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: format_date(postEdge.node.frontmatter.date),
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        short_description: postEdge.node.frontmatter.short_description
      });
    });
    return postList;
  }

  render() {
    let sections = this.props.sections;
    return (
      <div>
        {sections.map(section => (
          <SectionSelector section={section} />
        ))}
      </div>
    );
  }
}

export default FlexibleContent;
