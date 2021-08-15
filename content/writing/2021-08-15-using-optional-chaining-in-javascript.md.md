---
post_type: post
title: Using Optional Chaining in JavaScript
short_description: TO DO
date: 2021-08-15T11:07:23.640Z
slug: optional-chaining-in-javascript
---


Optional chaining is a great feature in order fo you to streamline some of checks that you need to have in your code to looking for the presence of elements and data, esspecially nested data multiple levels in!

It is still a realtively new feature and only getting more widespread browser support around early 2020, however this is something that has really shown how useful it is to me personally as my work has included more API driven and JAMstack development. Since then though my mind has been blown away with just how much cleaner it can make your code, and easier to write too 🤯

## So - What is so good about Optional Chaining?

I think to see how neat this feature is, lets first take a look at what you might have to do without it. Lets take the example of a made up JavaScript object that you may be working with / provided with, in this case me pretending that I'm back at university and enrolled in a course. *(if only...)*

```javascript
const api_response = {
  user: {
    name: {
      firstName: "Matthew",
      lastName: "Shields"
    },
    currentCourse: {
      courseDetails: {
        name: "Visual Communication",
        location: "Leeds Art University"
      },
      tutorDetails: {
        name: "Mr G Tansley",
        email: "g.t@leedsmadeupemail.com"
      }
    }
  }
};
```

Now if we were to want to get my tutors name and email out of this data for use somewhere else we could do something like this.

```javascript
const tutorName = api_response.user.currentCourse.tutorDetails.name;
// returns: "Mr G Tansley"

const tutorEmail = api_response.user.currentCourse.tutorDetails.email;
// returns: "g.t@leedsmadeupemail.com"
```

Now this would work for our example, we have data that matches this and so no horrible browser console errors, yay! But what if I wasn't currently enrolled in any courses? That will quickly change, and you will end up with something along the lines of ***'Uncaught TypeError: Cannot read property 'Property Names' of undefined'***.

```javascript
const api_response = {
  user: {
    name: {
      firstName: "Matthew",
      lastName: "Shields"
    },
    currentCourse: false
  }
};

const tutorName = api_response.user.currentCourse.tutorDetails.name;
// Uncaught TypeError: Cannot read property 'name' of undefined

const tutorEmail = api_response.user.currentCourse.tutorDetails.email;
// Uncaught TypeError: Cannot read property 'email' of undefined
```

The reason that we are getting this error is because when I was pulling the details before, I was doing this in a very fragile way that was working under the presumption that the data would always be there. In a general rule this isn't the best practice and you should put checks in and make sure that your code will work across all different situations - like me being a graduate rather then a student.

### So how could we stop these errors from happening?

One way to do so would be to check for the presence of every level in the data before we finally access the nested property. This does work and does make your checks alot more robust and you aren't going to catch that Uncaught TypeError from the last example.

However as you can see, it comes at the price of code legibility and well - having to code more! If you were to have a whole bunch of these throughout your codebase and an API structure change happened you can imagine how much of a pain that could be.

```javascript
let tutorName = false;

if(
  api_response && 
  api_response.user && 
  api_response.user.currentCourse && 
  api_response.user.currentCourse.tutorDetails && 
  api_response.user.currentCourse.tutorDetails.name
) {
  tutorName = api_response.user.currentCourse.tutorDetails.name;
}
```

*Its worth noting that there are actually alternatives to writing code like this independent to Optional Chaining for example Lodash's _.get() utility - this example is just for demonstrative purposes and purposefully Vanilla JavaScript and library-less.*

## Optional Chaining to the rescue

Now we've set the scene of what you may need to do without it, lets dig into how optional chaining could help us. This works by replacing our **.** chaining with **?.** optional chaining. Wherever this is used creates something along the lines of an inline if-statement where it will only continue if there is a none-null reference preceding it. In the event that it fails at any of the optional chaining points, it will exit there and return undefined.

As you can see in the next two examples, whether the properties exist in the data or not, we are either returning the value that we are after (my current tutors name), or a consistent \`undefined\` value if not. This allows you to then do simple checks later against the tutorName variable before using it.

```javascript
const api_response = {
  user: {
    name: {
      firstName: "Matthew",
      lastName: "Shields"
    },
    currentCourse: {
      courseDetails: {
        name: "Visual Communication",
        location: "Leeds Art University"
      },
      tutorDetails: {
        name: "Mr G Tansley",
        email: "g.t@leedsmadeupemail.com"
      }
    }
  }
};

const tutorName = api_response?.user?.currentCourse?.tutorDetails?.name;
// returns: "Mr G Tansley"


const api_response = {
  user: {
    name: {
      firstName: "Matthew",
      lastName: "Shields"
    },
    currentCourse: false
  }
};

const tutorName = api_response?.user?.currentCourse?.tutorDetails?.name;
// returns: undefined
```

Now in my opinion, this has really helped neaten this up and made it alot easier to write, read and maintain in the future when compared to the large chained if statement - and definitely a lot better then writing code which will recieve errors by not doing these sorts of checks.

## But what if I don't work with APIs or data?

The data situation that we have looked at so far is just a context that I think demonstrates the concept of Optional Chaining in an easy to understand way. Even if you don't work with API responses though I can guarantee that there are still ways that it can help you.

If you remember the concept is that in the event of a null reference preceding it, it will stop and not continue there are multiple ways that you can use this:

*



### Get element attribute

```javascript
// -------------------------------
// With Optional Chaining
// -------------------------------
const heroImageSrc = document.getElementById('hero-image')?.getAttribute('src');
// Return the first item in array if exists or undefined (but no error!)


// -------------------------------
// Without Optional Chaining
// -------------------------------
const heroImage = document.getElementById('hero-image');
const heroImageSrc = heroImage ? heroImage.getAttribute('src') : undefined;
// First check if there are any items in the array, then if so get the first item else undefined
```

### Get first element in array

Note: Notice that you aren't just adding a **?** preceding a usual **.** - the optional chaining operator is ?. so add both before your square brackets.

```javascript
// -------------------------------
// With Optional Chaining
// -------------------------------
const firstItemInArray = array_data?.[0];
// Return the first item in array if exists or undefined (but no error!)


// -------------------------------
// Without Optional Chaining
// -------------------------------
const firstItemInArray = (array_data.length > 0) ? array_data[0] : undefined;
// First check if there are any items in the array, then if so get the first item else undefined
```

It is worth 

It is worth 

## Browser Support

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>

<p class="ciu_embed" data-feature="mdn-javascript\_\_operators\_\_optional_chaining" data-periods="future_1,current,past_1,past_2" data-accessible-colours="true">
<p>Data on support for the mdn-javascript\_\_operators\_\_optional_chaining feature across the major browsers</p>
</p>