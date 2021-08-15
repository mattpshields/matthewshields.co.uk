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

One way to do so would be to check for the presence of every level in the data before we finally check

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

## Browser Support

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>

<p class="ciu\_embed" data-feature="mdn-javascript\\_\\_operators\\_\_optional_chaining" data-periods="future_1,current,past_1,past_2" data-accessible-colours="true">
<p>Data on support for the mdn-javascript\_\\_operators\\_\_optional_chaining feature across the major browsers</p>
</p>