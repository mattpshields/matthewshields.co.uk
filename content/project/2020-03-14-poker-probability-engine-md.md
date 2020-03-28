---
post_type: project
title: Poker Probability Engine
date: 2020-03-14T21:57:45.306Z
description: >-
  Possibly my favourite project I ever worked on was creating a poker
  probability engine for users to be able to calculate their probability of
  winning with any given hand. To me this is the clearest example of my work
  where it isn't immediately obvious for the user how sophisticated it is behind
  the scenes, but it brought me sheer joy with the hours of figuring out how to
  build it.


  One of the biggest challenges of this project was that it had to be completely
  client side. With no database of previous game data allowed, I created a
  mathematical system of hand comparison and implemented the Monte Carlo method,
  where using the declared cards, multiple games are played and tracked to give
  their probability. On top of this I was also set very ambitious speed
  performance targets of 5,000 games in five seconds with a high level of
  accuracy.


  I managed to completely smash the performance target and built a system where
  over 10,000 games are played in under one second and a highly accurate
  probability given (even on low powered devices) via a highly usable interface
  on either mobile or desktop.
options:
  - label: Tech Stack
    value: 'Vanilla JavaScript, HTML, CSS'
  - label: Targets
    value: '5,000 games in five seconds'
  - label: Results
    value: '10,000 games in under one second'
  - label: Improvement
    value: Double the number of iterations in more than 5x the speed
---

