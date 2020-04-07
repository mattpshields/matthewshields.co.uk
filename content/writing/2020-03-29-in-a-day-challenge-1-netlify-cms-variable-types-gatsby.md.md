---
post_type: post
title: Netlify CMS Variable Types + Gatsby
short_description: >-
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla
  veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro
  alias debitis voluptatum, dignissimos adipisci, dolor laborum minus hic!
date: 2020-03-29T18:12:27.948Z
slug: netlify-cms-variable-types-gatsby
---
> I have created a <a href="<https://github.com/MatthewShields/gatsby-netlify-cms-variable-types>" target="_blank">simplified repository</a> with a working example of this which might be helpful to refer to

I historically worked with WordPress for my CMS sites, and love the flexibility provided to me by using Advanced Custom Fields, more specifically with it's *'Flexible Content'* approach allowing to people build pages using any combination of components they require without resorting to using highly inefficient page builder plugins.

When building version one of my site though I knew I wanted pages to be different content on them, so for these bespoke pages I actually just made them using a file for each one. Longer term though I don't want to do this, if I have a CMS then I'm going to use the CMS. Not every project can have someone making a new file for every page creation after all.

> **TL;DR** - I want to use the Netlify CMS to be able to piece together pages with a flexible use of components, without creating new template files for each combination, and still be built by Gatsby.js

## Solution: Netlify CMS Variable Types

After looking into the widget types built into Netlify CMS I couldn't find anything that quite catered for my needs. The closest was 'List' which gives you the ability to add a repeatable set of fields, but these fields are static and the same for each repetition. I could use 'List' and add every instance of field along with ability to pick which component to use, but as there isn't any conditional logic this would get awful to use really fast.

On the Netlify CMS site they have a list of their beta features, and in there I found exactly what I was after - <a href="<https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types>" target="_blank">variable types</a>. This would give me the ability to use a repeater like with 'List' but assign different fields to each type.

This was easy to set up once I knew that it existed, unfortunately that came after a couple of hours of trying to build my own version of the ACF flexible content functionality as a Netlify CMS custom widget. But thats giving me ideas for another in a day challenge so nothing wasted!

```yaml
 
collections:
  - name: pages
    label: "Page"
    folder: "content/pages"
    media_folder: ''
    public_folder: ''
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}.md"
    fields:
      - { label: "post_type", name: "post_type", widget: "hidden", default: "page" }
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Short Description", name: "short_description", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Cover Image", name: "cover", widget: "image", required: false }
      - { label: "Slug", name: "slug", widget: "string" }
      - label: 'Page Section'
        name: 'sections'
        widget: 'list'
        types:
          - label: 'Text Block'
            name: 'text_block'
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
          - label: 'Block List'
            name: 'block_list'
            widget: object
            fields:
              - { label: Title, name: title, widget: string, required: false }
              - { label: Text, name: text, widget: markdown, required: false }
              - label: 'Blocks'
                name: blocks
                widget: list
                fields:
                  - { label: Title, name: title, widget: string }
                  - { label: Text, name: text, widget: markdown }
```

This then gives me the exact ability I wanted in the CMS as you can see above. Half the challenge done, now just to get this back into my Gatsby build and into the site. 

## How to get the variable data with GraphQL?

The next step was figuring out how the GraphQL query would work with it when I don't know what fields a given page would be querying for which components I have used. Initially I thought this would be quite simple, and queried for all fields across all of the various types, and it worked (for a while). Where this quickly fell down was that if there wasn't at least one page with an instance of a given type, Gatsby couldn't infer what type of data should be present.

A solution to this could be to have a page that had an example of all components on it, but that isn't something you want your site to be dependent on. If you were to add a new type or accidentally remove one of them your site is going to be unbuildable.

## Using createSchemaCustomization API and createTypes to define field content type

What you can do to get around this issue properly is use Gatsby's <a href="<https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions>" target="_blank">*createSchemaCustomization API*</a> to manually define what content type Gatsby should expect from a given field, rather than it requiring it to exist to be inferred. I will be honest I found the Gatsby documentation a little confusing on this one and it took me a while to get it but once you have it up and running it makes sense. 

You do this through the gatsby-node.js file, you will need to run the function and define each of your fields, taking care to make sure that you note which of your fields are repeatable (i.e. List widgets) as you will need to define these as expecting to be arrays. Heads up here to remember that you are working in your gatsby-node.js file, there isn't the hot-reloading like most of the project so don't forget that you will need to restart when you make changes.

Given my example config.yml from above and the resulting <a href="<https://raw.githubusercontent.com/MatthewShields/gatsby-netlify-cms-variable-types/master/content/pages/2020-04-06-test-variable-types-page.md.md>" target="_blank">markdown file</a> I have structured my type definitions like so:

* **MarkdownRemarkFrontmatter** - I tell it to expect an array of the fields as defined in *Sections*
* **Sections** - I tell this to expect the fields that I have used in my config.yml - note that you are defining the actual fields, I recommend referring to your created markdown file when doing this
* **List Widget fields** - When a List widget has been used I define these fields in their or type definition where they can then be included within the square brackets to tell Gatsby to expect an array

```javascript
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
  
      type CarouselImages {
        image: File
        alt: String
      }
      
      type BlockList {
        title: String
        text: String
      }
  
      type Sections {
        type: String
        title: String
        text: String
        images: [CarouselImages]
        blocks: [BlockList]
      }
  
      type MarkdownRemarkFrontmatter {
        sections: [Sections]
        cover: File @fileByRelativePath
      }
  
    `
    createTypes(typeDefs)
  }
```

## Building your GraphQL query

Now that we have our type definitions in place we can actually build the query for the page. I preferred building this using fragments, this made it a lot easier for me to organise these in my mind, ensuring that I have the fields that I wanted for each variable type. Don't worry about if you have duplicate fields in each fragment, such as *title* or *text*, these will be compiled into a single query.

```javascript
export const pageQuery = graphql`

  fragment Carousel on Sections {
    type
    title
    text
    images {
      image {
        childImageSharp {
          fluid(maxHeight: 700, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      alt
    }
  }

  fragment TextBlock on Sections {
    type
    title
    text
  }

  fragment BlockList on Sections {
    type
    title
    text
    blocks {
      title
      text
    }
  }

  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        short_description
        date
        cover {
          childImageSharp {
            fluid(maxHeight: 700, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        sections {
          ...TextBlock
          ...Carousel
          ...BlockList
        }
      }
      fields {
        slug
        date
      }
    }
  }
  
`;
```

When this query is returned I have an array of objects, one for each entry of a variable type, as you can see in this screenshot. Perfect as we now have a flexible query that will handle as many instances as needed, in any order, or without all types being present. Just what I needed!

![A screenshot of the array returned by the GraphQL query](variable-type-array-no-formatting.png "A screenshot of the array returned by the GraphQL query")

## Its all Markdown-hill from there

The eagle eyed of you might notice the lack of HTML formatting with the text field though, in fact at this point is returning the raw markdown content, this is less than ideal but luckily can be resolved, using... Field Resolvers (ba dum tsh). What we will first need to do is install the package <a href="<https://www.npmjs.com/package/remark-html>" target="_blank">remark-html</a>:

```bash
npm install remark-html
```

Then we will need to include a couple of modules that we will need to help us convert the markdown into the HTML we want:

```javascript
const remark = require(`remark`)
const html = require(`remark-html`)
```

Then we need to return back to our *createSchemaCustomization* function in our gatsby-node.js file from earlier. Using the example from Gatsby's documentation you can see how to add a new field extension that will take the input of the field content, convert from markdown and then return the final HTML. Once your field resolver is created you can then indicate which fields to use if on by indicating with @md in the create types setup.

```javascript

exports.createSchemaCustomization = ({ actions }) => {
  actions.createFieldExtension({
    name: "md",
    args: {
      sanitize: {
        type: "Boolean!",
        defaultValue: false,
      },
    },
    extend(options, prevFieldConfig) {
      return {
        args: {
          sanitize: "Boolean",
        },
        resolve(source, args, context, info) {
          const fieldValue = context.defaultFieldResolver(
            source,
            args,
            context,
            info
          )
          const shouldSanitize =
            args.sanitize != null ? args.sanitize : options.sanitize
          const processor = remark().use(html, { sanitize: shouldSanitize })
          return processor.processSync(fieldValue).contents
        },
      }
    },
  })

  const { createTypes } = actions
  const typeDefs = `

    type CarouselImages {
      image: File @fileByRelativePath
      alt: String
    }
    
    type BlockList {
      title: String
      text: String @md
    }
  
    type Sections {
      type: String
      title: String
      text: String @md
      images: [CarouselImages]
      blocks: [BlockList]
    }

    type MarkdownRemarkFrontmatter {
      sections: [Sections]
      cover: File @fileByRelativePath
    }

  `
  createTypes(typeDefs)
}
```

I'm definitely interested in finding out more about field resolvers as they seem like they could be really powerful and helpful in the future. For this particular issue though as you can see in this screenshot be are now getting our fully formatted HTML returning and ready to be used. 

![A screenshot of the array returned by the GraphQL query](variable-type-array.png "A screenshot of the array returned by the GraphQL query")