---
title: Particles.js
subtitle: A WebGL particle engine with a web based particle system editor.
tags:
- WebGL
- Web
---

<gif poster="./particles_js-750.jpg" mp4="./particles_js-750.mp4" webm="./particles_js-750.webm" ratio="1">
</gif>
<hidden>
  <img src="./particles_js-750.jpg" />
  <img src="./particles_js-750.mp4" />
  <img src="./particles_js-750.webm" />
</hidden>

<p class="caption">The particle system editor.</p>

A particle system and editor I was working on.

Neat but not performant enough.
At high particle counts the kind of OOPish code I wrote it with doesn't work well.
To get it to work well with thousands of particles the code would have to be re-implemented in shaders.

The code I ~ported this from was Objective-C and it performed great.
