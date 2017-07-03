---
title: Two Techniques for High Performance Javascript
---

There are really only two options at this point in time for getting javascript performance that's within a factor of 5 of native performance.

##ASM.js / Emscripten. 

A big typed array, no garbage collection, it's fast.

##WebGL. 

With WebGL you can offload tons of math to the GPU. 

Let's say you want to make a particle engine in Javascript. Obviously you'd want to render the particles with WebGL, canvas is slow btw. What may not be obvious is that it's robably also necesary for you to offload the updating of particle attributes to the GPU. You need to come up with a conversion of your attributes into pixel data that the GPU can process.

##To write fast javascript you need to write in C.

Both of the current options would generally involve writing performance critical code in ~C. For emscripten you'd then convert it to javascript. For WebGL you'd put the performance critical code in a shader.