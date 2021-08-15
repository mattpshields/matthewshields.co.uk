---
post_type: post
title: Using Optional Chaining in JavaScript
short_description: TO DO
date: 2021-08-15T11:07:23.640Z
slug: optional-chaining-in-javascript
---
Optional chaining is a great feature in order fo you to streamline some of checks that you need to have in your code to looking for the presence of elements and data, esspecially nested data multiple levels in!

It is still a realtively new feature and only getting more widespread browser support around early 2020, however this is something that has really shown how useful it is to me personally as my work has included more API driven and JAMstack development. Since then though my mind has been blown away with just how much cleaner it can make your code, and easier to write too 🤯

## So - What is Optional Chaining?



```javascript
const api_response = {
  user: {
    name: {
      firstName: "Matthew",
      lastName: "Shields"
    },
    courses: [
      {
        courseName: "Visual Communication",
        tutorName: "Mr G Tansley",
        grade: "2:1"
      },
      {
        courseName: "ND Art and Design",
        grade: "Pass"
      }
    ]
  }
};
```

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>
<p class="ciu_embed" data-feature="mdn-javascript__operators__optional_chaining" data-periods="future_1,current,past_1,past_2" data-accessible-colours="true">
<p>Data on support for the mdn-javascript__operators__optional_chaining feature across the major browsers</p>
</p>