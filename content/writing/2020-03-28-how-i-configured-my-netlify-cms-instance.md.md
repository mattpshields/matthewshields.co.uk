---
post_type: post
title: Configuration tips for Netlify CMS
short_description: >-
  Netlify CMS is a great CMS for management of a simple JAMstack site, such as a
  personal site like this one. Here I will talk about how I have configured my
  instance to work for me.
date: 2020-03-28T15:46:12.944Z
slug: configuration-tips-for-netlify-cms
---
* I want to talk about how I have set up my netlify CMS
* Media folders per post type
* editorial workflow
* Navigation management

As a new user of Netlify CMS and the JAMstack approach I've been blown away by the power behind this simple to use static CMS.

If you aren't aware of Netlify CMS it is a static single page React application , no-database content management system, which works through the creation and editing of files in Markdown, YAML or JSON to name a few options. This is a perfect partner when it comes to any number of static site generators like Gatsby, Jekkyl or NextJS thanks to their platform agnostic approach.

## Simple but configurable

The Netlify CMS documentation gives you a great breakdown of <a href="<https://www.netlifycms.org/docs/start-with-a-template/>" target="_blank">how to get started</a> and even a few templates for a few different site types, super helpful. So far, my entire configuration of Netlify has happened just in its config.yml file, a mark of its simplicity to pick up. There are additional areas that you may need to touch if you were to create your own Netlify CMS widgets but thats something that I'm yet to attempt but will write it up on here when I do!

## Editorial Workflow

I don't use this feature while in the initial build