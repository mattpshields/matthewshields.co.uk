---
post_type: post
title: Optimising Images using the Picture element and WebP images
short_description: Lorem
date: 2020-10-09T19:31:51.294Z
slug: optimising-images-with-picture-element-and-webp
---
Images make up a hefty chunk of most websites that we visit and create. There is reason for this of course – an image can be an effective way of demonstrating how a product looks, adding further context, or if we are honest are quite often contributing to an aesthetic.

These images do have an impact though, they can very quickly add up to being a large portion of the total page weight, **especially** when optimisation hasn't been considered. Page weight isn't directly proportional to performance impact, for example 10KB of image weight doesn't require the same actions from the browser as 10KB of JavaScript, but page weight definitely contributes to resource fetching workload. 

On top of this these images often differ between each page as well, and so won't always benefit from browser caching when navigating. This can be unlike things like CSS and JavaScript which ***may*** be global to the site and only need to be downloaded once for multiple pages.

Images will impact performance, images aren't going anywhere and images need to be used responsibly. This means it's our responsibility to ensure we lessen their impact wherever possible, and there are several steps that we can take to do so.

* **Appropriately size images** – oversized images will require more image weight to be downloaded then is required resulting in waste.
* **Optimise images** – depending on how the image was saved there might be a extra data in there bloating the image, or maybe the quality could be dropped a little. Its always worth running through compression.
* **Use responsive images** – don't make all devices pay the price for catering for the worst (or largest) case scenario unnecessarily.
* **Use optimal image formats** – maybe you have a large image of a simple shape as a JPG, or maybe you have non-transparent PNGs which would be better served in another format.
* **Use modern filetypes** – related to the last point, there are more modern filetypes that you might not be aware of that might give you better performance.

My recommendation though would be to automate these optimisations wherever possible, meaning that you are lessening the chances that you will miss or skip images over time. This is definitely the case if it is a CMS to be handed over to someone else, so that your hard work doesn't go to waste over time as performance decreases.