---
title: How to Incrementally Migrate 100k Lines of Code to Typescript
subtitle: Using a Snapshot Test
---

Migrating a large project to TypeScript even with the loosest settings may be insurmountable. The number of errors is overwhelming.

You may think the best options for fixing this situation is to use a mix of TypeScript and JS (using the `allowJs` flag), however there is a risk of a large amount of code never being typed because there is not enough incentive and feedback to do so.

If you run TypeScript on a large project after renaming files you may be faced with something like:

![](https://i.imgur.com/Vft7POh.png)

_Or there could be a lot more errors, this project started with 15k errors._

Unfortunately for a project of any sufficient size, you’re going to run into trouble trying to migrate to TypeScript in one go.

So what are your options?

| **Dimensions of Comparison**        | **Solo Hackathon** | **Team Hackathon** | **Enable on Changed Files** | **Checklist + Coach Team** | **Snapshot Test** |
| ----------------------------------- | ------------------ | ------------------ | --------------------------- | -------------------------- | ----------------- |
| Fast                                | ✅                 | ✅                 | ❌                          | ❌                         | ❌                |
| High Quality Results                | ✅                 | YMMV               | ✅                          | ✅                         | ✅                |
| Low Team-Coordination               | ✅                 | ❌                 | ✅                          | ❌                         | ✅                |
| Non-Breaking For Wip                | ❌                 | ❌                 | ✅                          | ✅                         | ✅                |
| Reliable On Larger Repos/Messy Code | ❌                 | ❌                 | ✅                          | ✅                         | ✅                |
| Can Enable Strict Rules On Day 1    | ❌                 | ❌                 | ✅                          | ✅                         | ✅                |
| Easy To Add Stricter Rules          | ❌                 | ❌                 | ✅                          | ✅                         | ✅                |
| Will Achieve 0 Errors               | ✅                 | ✅                 | ❌                          | ✅                         | ✅                |
| Easily Repeatable For New Rules     | ❌                 | ❌                 | ❌                          | ✅                         | ✅                |

_Think about it._

Ideally you would like to **achieve 0 errors** and **have an easily repeatable process for preventing new errors**.
To do this your best option may be creating a snapshot test.

On a high-level, using a snapshot test requires creating a test that runs TypeScript and saves a snapshot of all the errors along with filenames and line numbers.
This test will fail anytime lines are shifted on a file with errors, or when new errors are added to the codebase — this serves as a reminder to fix type errors when adding or modifying code.
This requires low coordination because it's an automated approach.

It also becomes very easy to incrementally increase the strictness of type checking, the incremental approach is the same.

In essence, **the snapshot test is closer to the code than any checklist process** and it requires low team-coordination.

## How to create a snapshot test of TypeScript errors?

This [repo (DylanVann/typescript-migration-demo)](https://github.com/DylanVann/typescript-migration-demo) shows a basic example of how to snapshot test TypeScript errors.

Here's how it works, consider the following 3 untyped JS files:

```javascript
// add.js
export default function add(a, b) {
  a + b
}
```

```javascript
// subtract.js
export default function subtract(a, b) {
  a - b
}
```

```javascript
// example.js
import add from './add'
import subtract from './subtract'

add('1', 3, 'hello world')

subtract('1', 3, 'hello world')
```

When we convert to TypeScript (changing file extensions and adding a `tsconfig.json` file) this will produce a number of type errors:

![](https://i.imgur.com/EV2toUg.png)

At this point you should run the snapshot test and commit the result. The snapshot of the errors will look something like this:

![](https://i.imgur.com/5MZtBUk.png)

## What happens when I fix or add type errors?

When you fix type errors you can run `yarn check-ts -u` to update the snapshot, and you will commit something like this:

![](https://i.imgur.com/Agsuu3U.png)

If you were to add a type error by accident you would see something like this:

![](https://i.imgur.com/NV69pQu.png)

_So at this point if you are doing PR reviews your reviewer would probably reject this change._

## Using ESLint (or other tools)

This technique applies to any pattern that can be detected using code quality tools.
For example it's possible to write ESLint rules for bad practices specific to your codebase.
You can then incrementally remove them using this technique.

## Conclusion

Out of all the possible techniques to migrate to TypeScript this one has a lot of things going for it.
