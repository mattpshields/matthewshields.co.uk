---
post_type: post
title: Lessening the Impact of Images on Page Performance
short_description: Lorem
date: 2020-10-09T19:31:51.294Z
slug: lessening-the-impact-of-images-on-page-performance
---
> Dedicated to [Naomi](https://naomi.dev/), who gives to the Leeds developer community so much but asks so little.

Images make up a hefty chunk of most websites that we visit and create. There is reason for this of course – an image can be an effective way of demonstrating how a product looks, adding further context, or if we are honest are quite often contributing to an aesthetic.

These images do have an impact though, they can very quickly add up to being a large portion of the total page weight, **especially** when optimisation hasn't been considered. Page weight isn't directly proportional to performance impact, for example 10KB of image weight doesn't require the same actions from the browser as 10KB of JavaScript, but page weight definitely contributes to resource fetching workload. 

On top of this these images often differ between each page as well, and so won't always benefit from browser caching when navigating. This can be unlike things like CSS and JavaScript which ***may*** be global to the site and only need to be downloaded once for multiple pages.

## So how can we lessen the impact of images on page performance?

Images will impact performance, images aren't going anywhere and images need to be used responsibly. This means it's our responsibility to ensure we lessen their impact wherever possible, and there are several steps that we can take to do so.

* **Use optimised images** – oversized and bloated images will require more image weight to be downloaded than is required resulting in waste.
* **Use responsive images** – don't make all devices pay the price for catering for the worst (or largest) case scenario unnecessarily.
* **Use optimal image formats** – maybe you have a large image of a simple shape as a JPG, or maybe you have non-transparent PNGs which would be better served in another format.
* **Use modern filetypes** – related to the last point, there are more modern filetypes that you might not be aware of that might give you better performance.
* **Lazy loading images** – are you loading all images on initial page load? maybe some of those images could wait a while if they are further down the page.

In terms of this post though I am going to focus in on front-end implementations and cover how we can tick off the following points:

* **Use responsive images**
* **Use modern filetypes**
* **Lazy loading images**

When it comes to optimising images and using the most appropriate filetypes, this will be really dependent on the platform and build process that you are using and knowing about all the different filetypes. 

If image optimisation is something that you want to know more about then I would recommend searching for an article focusing on your specific platform, I can nearly guarantee that for any popular platform posts on this will exist and is definitely worth investing some time into making sure you have image optimisation running! I will also be following up with a post about appropriate file types soon so I will go into more detail about this then as its definitely a topic all of it's own.

## Lets get started, with a standard image tag

You may well be used to using images like this and be wondering, with the limited options available how would be implement the things that we are wanting to? You could be picturing what plugins, or what logic you might need to create to tick them all off. 

Luckily in more modern browsers, you have been given a whole bunch of the tools that you need already and we are actually going to do all the above with just HTML, no JavaScript required* here.

```html
<img src="example.jpg" alt="descriptive text of the image">
```

\* Disclaimer: depending on your browser support goals, you may need to bring in some JavaScript polyfills to give you the support you require.

## Using srcset to optimise image performance

Something that you might have heard of or have seen is srcset, which if you haven't heard of it is a way of providing more than one image source to a single image tag, along with hints about when each image source should be used.

When using srcset you may end up with something like this:

```html
<img 
src="example.jpg"
srcset="small-example.jpg 500w, large-example.jpg 1000w" 
alt="descriptive text of the image"
/>
```

With this you are providing multiple images sources to the browser, along with a description of the width of that image. The browser will then use the width and resolution of the browser window to select which one to use.

So if your non-retina browser window was 400px wide when viewing the image, it would select the one that was best automatically, in this case selecting the 500px wide image to display. This would substantially reduce the amount of wasted resources on downloads for an image size that it didn't require, especially when you add this up throughout the entire site.

If you take this example again though and say that you were to still be viewing it in a 400px wide but not a retina 2x display, the browser looking at this again would determine that the 500px wide image wouldn't suffice anymore and so serve the 1000px wide version - the closest to what it requires.

The absolutely great thing about srcset in some ways is how much of the work is done for you, you are merely providing the browser the information that it requires to make it's decision. And although is currently not the case (as far as I know) because the browser is making the decision this could start to take other aspects into consideration in the future (people being able to flag for using reduced resources to save on their phone bill etc). Because these are decisions that the browser is making for you and not ones that you need to fully break out these sorts of future updates might be possible to make without changes needing to be make within the code.

### But what if my images aren't full browser width?

You might have noticed that I said that the browser will use the windows width along with resolution to make its decision. This is because the browser will assume that it all images are full width in order to be able to make its calculations. To do otherwise I think could lead to a loss in performance gains as this would require it to wait until the page was laid out in order to know how large the image was when displayed.

Images being full width isn't always going to be the case though, and this might lead to missing out on some further optimisation opportunity, purely because the browser has false information. Luckily you can give it the further information it requires in order to make the best decision possible, it's almost like the amazing people behind this really thought it through!

With the addition of the sizes attribute, you can tell the browser what size the image will be displayed at various viewport sizes in either px, em, rem or vw units. To do this you can provide a comma denominated list of a media query condition, in this case max width, and the value associated with it.

You may notice that the last value I have in my list doesn't have a media condition with it. Because the browser will use the first media query that is valid this means because it is the last one I have it will be the default one used if nothing else matches. You need to be aware of this when ordering your different size declarations, if you aren't careful with this then you may well get caught out. 

I generally try to stick to an approach like this where I have my mobile view as the default and then build up my sizes from smallest up. As with everything though there is never one rule that fits everything, just be aware of it and make sure to sense check.

```html
<img 
src="example.jpg"
srcset="small-example.jpg 500w, large-example.jpg 1000w"
sizes="(min-width: 1000px) 800px, 100vw"
alt="descriptive text of the image"
/>
```

It is also worth noting that you can't provide these sizes as percentages. This has been done to [avoid confusion](https://www.w3.org/TR/2015/WD-html51-20150506/semantics.html#valid-source-size-list) as to what the percentages would be relative to (i.e. the parent element). If you are after a fluid value then you would have to use vw.

And with that we have officially implemented responsive images! You now have the ability to load optimised images for specific viewport sizes and resolutions, a great first step in optimising the performance impact from images The first item on the list is ticked off. High five.



### So has srcset fixed everything?

Well its done pretty damn well hasn't it! So far using srcset our checklist from the start of this is looking pretty ticked off:

* **Use responsive images**
* **Use modern filetypes**
* **Lazy loading images**

## Using the <picture> element

## What about sizing and optimising images?

## Whilst were talking about images

Don't forget your accessibility responsibilities, images have the ability to provide alt text for your screen reader users. Make sure that you follow the correct approach with