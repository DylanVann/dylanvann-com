---
title: Loading large models in three.js
subtitle: An examination of four techniques.
tags:
- Web Dev
- JavaScript
---

## Using provided loaders from the three.js examples.

![]({% asset_path dvdatepickertableviewcell.gif %})

This is nice and easy but the parsing is done synchonously and this can cause issues.

**Pros:**

- Simple.
- Fast.

**Cons:**

- Blocking.
- Can cause warnings and crashes when parsing large files.

## Using `setTimeOut` to parse the model without blocking.

![]({% asset_path dvdatepickertableviewcell.gif %})

Uses setTimeOut to achieve non-blocking parsing.
This method is good when we have a simple format like STL to parse.

**Pros:**

- With some formats we can display partial loading of the model.
- We don't have to transfer data between threads.

**Cons:**

- Trickier to code for.
- Might not work for more complex formats.
- If it's a more complex or compressed format we likely won't be able to show partial progress while decompressing.

## Using a WebWorker with typed arrays.

![]({% asset_path dvdatepickertableviewcell.gif %})

With this solution we load the geometry into typed arrays of vertices and normals.
These arrays can be quickly added as attribute arrays to a THREE.BufferGeometry

**Pros:**

- Fastest method.
- Simple to code.

**Cons:**

- Can only communicate simple geometry.
- Doesn't support animations.

## Using a modified JSONLoader.

![]({% asset_path dvdatepickertableviewcell.gif %})

**Proposed workflow:**

- Parse your specific format in a WebWorker using the normal blocking code.
- Send back the geometry as JSON.
- Parse the geometry using a non-blocking JSONLoader

Where does one get this non-blocking JSONLoader? Here it is:

[NonBlockignJSONLoader.js](http://github.com)

**Pros:**

- Totally non-blocking.
- Easy to support all model formats.

**Cons:**

- Slower due to having to do parsing twice.
