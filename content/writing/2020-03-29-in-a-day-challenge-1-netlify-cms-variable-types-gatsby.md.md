---
post_type: post
title: 'In A Day Challenge 1: Netlify CMS Variable Types + Gatsby'
short_description: >-
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla
  veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro
  alias debitis voluptatum, dignissimos adipisci, dolor laborum minus hic!
date: 2020-03-29T18:12:27.948Z
slug: in-a-day-challenge-netlify-cms-variable-types-gatsby
---
From experience I've learnt that I struggle to keep momentum when it comes to daily challenges in terms of building something fully finished that I am willing to share and the requirement to do it every day despite anything else going on in my day (which is quite often hectic) is almost setting myself up to fail and not additional pressure that I need, I want to keep this enjoyable.

## Introducing my 'in a day' challenge

Instead what I am going to do is several times a week I am going to set myself a challenge of figuring something out in a day and writing it up in the same day. Something I think I can keep up longer term with reduced pressures, some of them might end up being the inspiration of longer form posts too when I want to really dig into a subject.

## Challenge 1: Using Netlify CMS create pages with flexible templates

I historically worked with WordPress for my CMS sites, and love the flexibility provided to me by using Advanced Custom Fields, more specifically with it's *'Flexible Content'* approach allowing to people build pages using any combination of components they require without resorting to using highly inefficient page builder plugins.

When building version one of my site though I knew I wanted pages to be different content on them, so for these bespoke pages I actually just made them using a file for each one. Longer term though I don't want to do this, if I have a CMS then I'm going to use the CMS. Not every project can have someone making a new file for every page creation after all.

> **TL;DR** - I want to use the Netlify CMS to be able to piece together pages with a flexible use of components without creating new template files and still be built by Gatsby.js

## Solution: Netlify CMS Variable Types

After looking into the widget types built into Netlify CMS I couldn't find anything that quite catered for my needs. The closest was 'List' which gives you the ability to add a repeatable set of fields, but these fields are static and the same for each repetition. I could use 'List' and add every instance of field along with ability to pick which component to use, but as there isn't any conditional logic this would get awful to use really fast.

On the Netlify CMS site they have a list of their beta features, and in there I found exactly what I was after - <a href="<https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types>" target="_blank">variable types</a>. This would give me the ability to use a repeater like with 'List' but assign different fields to each type.

This was easy to set up once I knew that it existed, unfortunately that came after a couple of hours of trying to build my own version of the ACF flexible content functionality as a Netlify CMS custom widget. But thats giving me ideas for another in a day challenge so nothing wasted!

```yaml
  - name: pages
    label: "Page"
    folder: "content/pages"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}.md"
    fields:
      - label: 'Page Section'
        name: 'sections'
        widget: 'list'
        types:
          - label: 'Text Block'
            name: 'text-block'
            widget: object
            fields:
              - { label: Title, name: title, widget: string }
              - { label: Text, name: text, widget: markdown }
          - label: 'Carousel'
            name: 'carousel'
            widget: object
            fields:
              - { label: Title, name: title, widget: string }
              - { label: Text, name: text, widget: markdown }
              - label: 'Images'
                name: images
                widget: list
                fields:
                  - { label: "Image", name: "image", widget: "image", required: false }
                  - { label: Image Description, name: alt, widget: string }
```

This then gives me the exact ability I wanted in the CMS as you can see above. Half the challenge done, now just to get this back into my Gatsby build and into the site. 

The next step was figuring out how the GraphQL query would work with it when I don't know what fields a given page would be querying with which components I have used. For this its actually quite simple, I query for all fields across all of the various types.

\[INSTANCE OF GRAPHQL]

When this is returned I have an array of objects, one for each of the types that page had in the CMS, with only its relevant fields as part of that object. I will now be able use that array to loop through and