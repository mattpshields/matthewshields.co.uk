---
post_type: post
title: Using Optional Chaining and Nullish Coalescing Operator in JavaScript
short_description: TO DO
date: 2021-08-15T11:07:23.640Z
slug: using-optional-chaining-and-nullish-coalescing-operator-in-javascript
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

## Nullish Coalescing Operator as your backup

I mentioned how the optional chaining operator would return undefined if it failed at any of its checks, but what if you don't want undefined to be your backup value?

You could do a check after that point and set it to be a different value, however this may conflict with your use of a const variable and adds more code. What you could do though is pair the Optional Chaining Operator with the Nullish Coalescing Operator like so.

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

const tutorName = api_response?.user?.currentCourse?.tutorDetails?.name ?? "Current Tutor N/A";
// returns: "Current Tutor N/A"
```

In this event when the Optional Chaining Operator fails and returns undefined, the Nullish Coalescing Operator kicks in and so your backup value is set.

You might be thinking though - this looks similar to the Or operator || - why can't I just use that? The key difference is that the Nullish Coalescing Operator responds to a smaller set of conditions, specifically only when the value is null or undefined. If you were to use the Or Operator and the value on the left was valid, but equated to 0, "", false etc then you may still end up using your backup value unintentionally.

It doesn't mean that you may not ever use the Or Operator, in some situations that might be what you require. As a general default though I would use the Nullish Coalescing Operator first and change only when required.

## But what if I don't work with APIs or data?

The data situation that we have looked at so far is just a context that I think demonstrates the concept of Optional Chaining in an easy to understand way. Even if you don't work with API responses though I can guarantee that there are still ways that it can help you.

If you remember the concept is that in the event of a null reference preceding it, it will stop and not continue there are multiple ways that you can use this:

### Get element attribute

```javascript
// -------------------------------
// With Optional Chaining
// -------------------------------
const heroImageSrc = document.getElementById('hero-image')?.getAttribute('src');
// If the #hero-image element exists then get its src attribute else undefined


// -------------------------------
// Without Optional Chaining
// -------------------------------
const heroImage = document.getElementById('hero-image');
const heroImageSrc = heroImage ? heroImage.getAttribute('src') : undefined;
// First get the #hero-image element then check if that exists before getting its src attribute or undefined
```

### Get first element in array

Note: Notice that you aren't just adding a **?** preceding a usual **.** the optional chaining operator is **?.**  - so add both before your square brackets!

```javascript
// -------------------------------
// With Optional Chaining
// -------------------------------
const firstItemInArray = array_data?.[0];
// Return the first item in array if exists or undefined


// -------------------------------
// Without Optional Chaining
// -------------------------------
const firstItemInArray = (array_data.length > 0) ? array_data[0] : undefined;
// First check if there are any items in the array, then if so get the first item else undefined
```

### Call function only if it exists

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
  },
  helloWorld() {
    console.log('hello world');
  }
};

// -------------------------------
// With Optional Chaining
// -------------------------------
api_response?.helloWorld?.();
// If the object method exists then call it inline


// -------------------------------
// Without Optional Chaining
// -------------------------------

if(api_response && typeof api_response.helloWorld === "function"){
  api_response.helloWorld();
}
// First check if the method exists then seperately call that function
```

## What can't you do with it?

One of the biggest things that you cannot do with this comes down to the rule that you cannot use it on the left hand side of any statements! So what does that mean - you can't **set** a property value only if it exists without doing a check first. Lets see an example of something that you **can't** do:

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

api_response?.user?.name?.firstName = "Matt";
// returns: Uncaught SyntaxError: Invalid left-hand side in assignment
```

What you can do though, is still use the optional chaining for a much tidier if statement condition. Then safe in the knowledge that it will only run in the event the last property exists, separately set that value.

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

if(api_response?.user?.name?.firstName) {
  api_response.user.name.firstName = "Matt";
}
// returns: "Matt"
```

## Requirements and Browser Support

The support coverage for this feature has a really good coverage at this time, covering all major browsers with the exception of Internet Explorer.

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__optional_chaining-1629034552274.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__optional_chaining-1629034552274.png">
<img src="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__optional_chaining-1629034552274.jpg" alt="Data on support for the mdn-javascript__operators__optional_chaining feature across the major browsers from caniuse.com">
</picture>

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__nullish_coalescing-1629034902817.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__nullish_coalescing-1629034902817.png">
<img src="https://caniuse.bitsofco.de/static/v1/mdn-javascript__operators__nullish_coalescing-1629034902817.jpg" alt="Data on support for the mdn-javascript__operators__nullish_coalescing feature across the major browsers from caniuse.com">
</picture>

If your support requirements aren't covered by this though (I sometimes am still supporting IE myself), its important to note that Babel can transpile Optional Chaining and so you can still use this despite that!

If you are working with Node then you will require Node 14 minimum to utilise this.

### Tip: Are you using Netlify Serverless Functions?

Just as a little pointer as I discovered myself recently, Netlify Serverless Functions by default are at the time of writing using Node 12, however you can easily change this by adding a variable to site settings trough the Netlify UI as [described here](https://docs.netlify.com/functions/build-with-javascript/#runtime-settings).

```
AWS_LAMBDA_JS_RUNTIME = nodejs14.x
```

## In Conclusion

Apart from the fact that I've said Optional Chaining outloud proof-reading this enough times that they don't even sound like real words anymore - I am genuinely excited about using this feature more.

As I said at the beginning of this, my work has started to integrate with APIs more, and so the variable data that comes with that has become more a part of my work as well. Even over the last couple of months this has made a marked improvement to my experience.

But what about you? Have you had differing experiences or are there any gotchas that I am yet to come across? Let me know if there are!