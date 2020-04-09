---
post_type: post
title: Using React Helmet
short_description: >-
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla
  veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro
  alias debitis voluptatum, dignissimos adipisci, dolor laborum minus hic!
date: 2020-04-06T07:34:43.965Z
slug: using-react-helmet
---


* additional head elements
* Dynamic examples

One of the first things that I had to figure out when working with React was how to be able to manage the elements outside the React application, namely the contents of the <head>. As you build targetting an element within the body, how do you easily manage the <head> elements from with React?

The head part of the html document serves some very important uses:

* Providing context as you move between different pages.
* Search Engine Optimisation (SEO) through elements such as the title and meta description.
* Avoiding Google duplicate content penalties with an appropriate canonical tag.
* Controlling the images used when your page is shared on social media for maximum impact.
* Providing additional information to services through Schema data.
* And so many more that I can't list them all - luckily <a href="<https://github.com/joshbuchea/HEAD>" target="_blank">Josh Buchea</a> has!

I work at an agency which specialises in SEO, so this has always been a focus in my professional work, and knew was something that I would require if I was to bring React into our commercial stack. This meant it was something that I needed to be able to easily manage, but also pass the SEO tests as well.

## The NFL to the rescue: react-helmet

Although not into sports of any variety, consider me a fan for this React component from the development team at the NFL. <a href="<https://github.com/nfl/react-helmet>" target="_blank">react-helmet</a> provides a very accessible way to control any elements of the head including title, base, meta, link, script, noscript, and style tags from within any level of your React application.

You can do this by importing react-helmet, and then passing as child elements the tags that you are wanting to appear in the head. You can see in this example from their <a href="<https://github.com/nfl/react-helmet>" target="_blank">GitHub page</a> how they are passing JSX tags as children of the component, and that is all that you have to do for them to appear in the head.

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

Genuinely one of the amazing things about react-helmet is its ease of use, providing much needed functionality for