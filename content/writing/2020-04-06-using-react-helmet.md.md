---
post_type: post
title: Using React Helmet to Manage the Document Head and SEO tags
short_description: 'Managing '
date: 2020-04-06T07:34:43.965Z
slug: using-react-helmet-to-manage-document-head-seo-tags
---
One of the first things that I had to figure out when working with React was how to be able to manage the elements outside the React application, namely the contents of the <head>. As you build targeting an element within the body, how do you easily manage the <head> elements from within React?

The document head serves some very important uses:

* Providing context as you move between different pages.
* Search Engine Optimisation (SEO) through elements such as the title and meta description.
* Avoiding Google duplicate content penalties with an appropriate canonical tag.
* Controlling the images used when your page is shared on social media for maximum impact.
* Providing additional information to services through schema data.
* As well as so many more that I can't list them all - luckily <a href="<https://github.com/joshbuchea/HEAD>" target="_blank">Josh Buchea</a> has!

A common issue with React sites in production sites is the lack of unique meta titles and descriptions, with generic text being applied throughout the site.

I work at an agency which specialises in SEO, so there's always been an importance for this in my professional work and I knew this was something that I would require if I was to bring React into our commercial stack. This meant it was something that I needed to be able to easily manage, but also have pass the SEO requirements.

## The NFL to the rescue: react-helmet

Although not into sports of any variety, consider me a fan for this React component from the development team at the NFL. <a href="<https://github.com/nfl/react-helmet>" target="_blank">'react-helmet'</a> provides a very accessible way to control any elements of the document head including title, base, meta, link, script, noscript, and style tags within any level of your React application.

You can add these tags by first importing react-helmet and then passing as child elements the tags that you are wanting to appear in the document head. You can see in this example from their <a href="<https://github.com/nfl/react-helmet>" target="_blank">GitHub page</a>, how they are passing JSX markup as a child of the component for them to be added.

```javascript
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```

One of the amazing things about react-helmet is its ease of use, providing much-needed functionality for a technically performant site, without asking much from the developer to integrate.

## Where do I use it?

You're not actually putting the code into the document head, so where do you put it within the React application? 

You can add it into any component and react-helmet will work from there. The approach that quite a lot of sites or frameworks using react-helmet take is to create an SEO component. This component, when passed the node data for the particular page or post you are on, will take the title and description etc and have a generic component that creates the tags there. 

```javascript
import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let image;
    let postURL;

    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      image = postMeta.cover;
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
```

*A simplified example from the SEO component included in <a href="<https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/src/components/SEO/SEO.jsx>" target="_blank">gatsby-advanced-starter</a>.*

This approach has worked really well for me as it means that I don't have to have the code in each of my templates and has ensured consistency across the site. But what if you need something custom on a page which your generic component doesn't cater for?

## Nested <Helmet> instances

A great feature of react-helmet is that it will deal with multiple instances with ease, combining them. This means that you can add additional tags in the individual template or component where you require it, such as JSON schema. Note that it will give priority to the last instance whenever there are duplicate properties, so you can overwrite anything, dictated by the order of where it was defined.

What could you use this for? If you wanted to have a different favicon to show the status of a process such as an upload being paused, or a title change when displaying content in a modal. This would give you the ability to improve user experience, giving the user additional visual cues.

In the example below, imagining a podcast player, the page would standardly display the favicon as defined in the SEO component. When the podcast player's state indicates that it is playing or paused (because they came after the SEO component), the defined favicon would be overwritten.

```javascript
render() {
  return (
    <div>
      // The generic SEO component included in all templates
      <SEO />

      // Two different overwrites dependent on component state
      {this.state.player_state === 'playing' &&
        <Helmet>
          <link rel="icon" href="./playing-favicon.png" sizes="16x16" type="image/png" />
        </Helmet>
      }
      {this.state.player_state === 'paused' &&
        <Helmet>
          <link rel="icon" href="./paused-favicon.png" sizes="16x16" type="image/png" />
        </Helmet>
      }
      ...
    </div>
  );
}
```

## Another Example: JSON Schema

When wanting to add JSON schema to your site, of which there is a <a href="<https://schema.org/docs/full.html>" target="_blank">huge variety</a>, this can be done in a very similar way. If you prepare your data in a variable, you can JSON.stringify your finalised variable before passing it into the Helmet component within the script tag.

```javascript
export default function Template({ data }) {

  const schema = {
    "@context": "http://schema.org/",
    "@type": "PodcastEpisode",
    "url": "https://examplepodcast.dev"+data.path,
    "name": data.title,
    "datePublished": data.formattedDate,
    "timeRequired": data.length,
    "description": data.description,
    "associatedMedia": {
      "@type": "MediaObject",
      "contentUrl": data.audio
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "Example Dev Podcast",
      "url": "https://examplepodcast.dev/"
    }
  };

  const JSONschema = JSON.stringify(schema)

  return (
    <div>
      <SEO />
      <Helmet>
        <script type="application/ld+json">{JSONschema}</script>
      </Helmet>
    </div>
  )
}
```

## SEO Requirements for the document head

Now that you know *how* to manage your document head using react-helmet, *what* should you be adding into it? As previously stated there are a huge variety of tags that can be added, but my advice to you would be to ensure that at a **minimum** your site includes the following:

* **Meta Title** - *e.g. Page Title | Site Name, aim to keep it under 60 characters.*
* **Meta Description** - *a more expansive description of what the page content is about. Aim to keep within about 160 characters.*
* **Canonical Tag** *\- set the definitive URL for the page to avoid duplicate content penalties, this can happen if your site is accessible from multiple URLs (with and without trailing slash, with query strings etc)*
* **Favicon** *\- this makes it easier for users to identify your site in a collection of tabs (if you browse like I do) and makes it easier to return to your site.*
* **Robots** (for some pages) - *although not required across the site, you would do well to identify pages that you may not want indexing, such as contact form 'thank you' pages.*
* **Breadcrumb JSON Schema** *\- for sites with multiple levels, providing search engines this schema will provide greater context for the structure of your site. If this is the case I would also recommend that you provide this visually for users as well.*

And an honorary mention:

* **Social Meta Tags** *\- although not strictly SEO relevant, defining how your site will appear when shared on social can greatly increase the chance of people clicking through to your site and this is obviously good!*

In addition to these I would also look into additional JSON schema, to provide search engines further information about your content. An example of this was the podcast episode schema data example I showed earlier. Here are some good schemas that you might want to take a look at adding:

* <a href="<https://schema.org/Organization>" target="_blank">Organisation</a> - This gives you the opportunity to define things like the company logo

## Time to start using react-helmet

I hope these examples have convinced you that if you aren't already using react-helmet to manage your document head then it might be time to start. From SEO to user experience there are lots of benefits to taking the tags included in the document head into consideration, and now they should be easier for you to implement.