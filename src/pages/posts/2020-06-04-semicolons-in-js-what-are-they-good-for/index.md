---
title: Semicolons in JavaScript, what are they good for?
subtitle: Everything you need to know.
author: Dylan Vann
description: Everything you need to know.
---

## Typing More

<!-- prettier-ignore-start -->
```tsx
const withOutASemi = 'possibly unfinished'
const withASemi = 'clearly terminated';
```
<!-- prettier-ignore-end -->

Some people enjoy typing out an extra character on every line.

_It goes without saying you'll also get to read slightly more._

## Harder to Read Diffs

This attribute of semicolons will help you keep code reviewers on their toes.

### Harder to Read Diffs When Adding a Chained Method

<table style="width: 100%;">
<tr>
<td>Semicolons</td>
<td>No Semicolons</td>
</tr>
<tr>
<td>

```diff
  const thing = another
-   .map(v => v * 2)
-   .filter(v => v / 5);
+   .map(v => v * 2);
```

</td>
<td>

```diff
  const thing = another
    .map(v => v * 2)
-   .filter(v => v / 5);
```

</td>
</tr>
</table>

This change now shows as affecting two lines, when it really only affects one.
I bet our reviewer didn't see that one coming when they spent time scanning both lines for changes ;).

### Harder to Read Diffs When Adding a Chained Method

<table style="width: 100%;">
<tr>
<td>Semicolons</td>
<td>No Semicolons</td>
</tr>
<tr>
<td>

```diff
  const thing = another
-   .map(v => v * 2);
+   .map(v => v * 2)
+   .filter(v => v / 5);
```

</td>
<td>

```diff
  const thing = another
    .map(v => v * 2)
+   .filter(v => v / 5);
```

</td>
</tr>
</table>

This change now shows as affecting two lines, when it really only affects one.

## Making It More Difficult to Move Around Lines

<table style="width: 100%;">
<tr>
<td>Semicolons</td>
<td>No Semicolons</td>
</tr>
<tr>
<td>

![Semi](semi.mp4)

</td>
<td>

![No Semi](no-semi.mp4)

</td>
</tr>
</table>

Shuffling lines is easy, especially if you use vim.
If you'd like to swap the last and second last chained methods you need to manually fix the semicolon.
This ensures you don't accidentally modify your code.

## Preventing Bugs in Cases That Will Never Come up If the Code You're Writing Isn't Terrible

<!-- prettier-ignore-start -->
```typescript
// Something a civilized person might do, creating a variable.
const myNumbers = [1, 2, 3]
[1, 2, 3].forEach() // I didn't make a variable for these.
// I don't even know what they are ¯\_(ツ)_/¯.
// I also don't use prettier, which would pull this line up making my mistake very obvious.
```
<!-- prettier-ignore-end -->

OH NO, A BUG CAUSED BY LACK OF SEMICOLONS!
Surely it will take us hours to figure out what's wrong.

Do you write code like this? If you do you'll love semicolons.

## Conclusion

If you like making it needlessly more difficult to type out, modify, and code review, your code, then you should use semicolons in JavaScript.
