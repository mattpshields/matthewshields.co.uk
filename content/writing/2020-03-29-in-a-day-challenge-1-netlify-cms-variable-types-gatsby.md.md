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

On the Netlify CMS site they have a list of their beta features, in there I found exactly what I was after - <a href="<https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types>" target="_blank">variable types</a>.