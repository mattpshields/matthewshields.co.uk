---
post_type: post
title: Designers and Developers - Be animation cheapskates
short_description: A short description
date: 2020-03-28T19:44:46.871Z
slug: being-an-animation-cheapskate
---
When it comes to animations, much like first-dates there are two types, those who go all out and spend every penny they have, and those who do it on the cheap. Ok that might be a simplification about the dates (i'm fairly certain theres some middle-ground) but is quite true about the animations.

Animation is a part of the process which lives in that grey are between design and development, a visual element that is as much part of the design as any other but brought to life through development. It is important that a designer thinks about the animation as much as the developer, however they are likely to think about it in different ways. The difficulty is that its possible to do almost anything, but there are prices to be paid for everything you do - and its the responsibility of everyone involved to be aware of that. Even after a lot of hard work bringing a project to life through the design and then development it can lose its impressiveness to the user if their browser grinds to a halt whilst they are interacting with it.

The issue with animations is that *(forgive me while I over-simplify here)* there are two types, cheap and expensive. By cheap we mean animations that can occur without a large performance hit to the browser and of course expensive being those that are going to potentially cause issues if done without consideration.

### What does animation involve?

There are several processes that are involved in the rendering of a webpage:

* **Style:**		start off by matching which styles correspond to which elements and applied.
* **Layout:**		this is where the geometry of the all the elements on the page are calculated, this is the most intensive part of the process as each elements geometry impacts upon each other.
* **Painting:**		is what it sounds like, the filling in or painting of pixels. This will include all the images, text, colours etc typically into layers.
* **Compositing:**	the layers painted are now drawn to the screen rendering the final page.

As you can see theres a lot of work involved, especially for more complicated webpages with lots of elements effecting each other. Why some animations cause more of an impact on performance than others is because they effect the layout phase meaning that it has to run through from that point again, recalculating the geometry for every element on the page again and repainting and compositing any effected areas.

## What animations are good for performance?

From a performance perspective you could argue that no animation would be the best animation, but thats not always going to be the case. Animations are important part of the modern web and user experience, so just be smart with them.

Not all animations will effect the layout phase and if you can avoid that you will definitely see an improvement in performance down the road when it gets to development. The least amount of rework possible is what you should be aiming for, ideally just the compositing layer but the painting layer is ok too and layout only when really necessary.

#### Cheapest animation properties

These are the ones you want to go for if at all possible:

* **CSS Transforms:** Theres a lot that you can achieve with one or a combination of these transformations from scaling, moving and rotating whilst still being efficient
* **Opacity:** As this doesn't change the size of any elements this will only require painting and compositing, why its so commonly used in hover effects

#### Cheaper animation properties

These might not be the cheapest animations as will still trigger a repaint but normally ok on performance if not overused:

* **Background Color:** Much like opacity a very commonly used animation
* **Background Position:** Used for a lot of parallax background effects and trusty sprite animations like Twitters [heart animation](https://medium.com/@chrismabry/how-did-they-do-that-the-twitter-like-animation-2a473b658e43).
* **Color:** Changing text color is often a good way to bring attention through a small change

#### What to avoid

There will always be circumstances where there is no other choice but for the most part try to avoid these properties as will alter the size of an element – a sure fire way to hitting that layout phase every time:

* Width/Height Margin/Padding
* Top/Left/Right/Bottom
* Border width
* Font size/weight
* Position
* Display
* Box-shadow

#### Why are Transforms ok?

You might be thinking, why are CSS Transforms ok after just saying that moving or resizing elements will cause layout changes and should be avoided. The difference with transforms are that although you are visually changing their size or appearance their geometry remains the same meaning they don't impact other elements and more importantly - no layout changes. And thats great for all of us, because there is a lot that you can achieve with them such as replacing out those highly inefficient position animations.

## Like a good story, its also about timing

You've worked out the animations that are going to bring something special to the site whilst keeping performance impact down, but even with optimised animations using things like opacity and transforms you might still see some lag if you are performing lots of them at the same time. You may need to start almost choreographing you animations, timing them to be staggered and reducing the number of effected elements at any one time. Apart from the fact this is a way of potentially improving performance it can be a way of bringing really nice effects to the table.

## What does this mean for me?

Some of this will more directly impact the developer half of the equation but what effects one should concern the other, and although there are often work arounds to create effects while minimising the impact *(often using pseudo elements like this [technique for box-shadow](http://tobiasahlin.com/blog/how-to-animate-box-shadow/))* it always pays to keep these for when you really need them. What this shared knowledge should hope to achieve is a situation where instead of the developer being seen when raising concerns later in the process and be seen as limiting or reducing the impressiveness of a design, or not rasing these issues and shifting this responsibility into a reduced experience for the end-user, everyone has been thinking about it in the same way from the very beginning.

#### Useful resources:

A great resource to use to find the impact of certain property changes is [CSS Triggers](https://csstriggers.com/), an easy to use reference guide that you should definitely have bookmarked. For each property this will break down which of the processed it will impact from Layout, Painting and Composite. Make sure to check out some of the properties you have been using - some may surprise you in what they will effect.