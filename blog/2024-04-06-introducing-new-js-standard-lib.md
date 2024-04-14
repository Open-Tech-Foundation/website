---
title: Introducing Our New JavaScript Standard Library
description: An extensive JavaScript Standard Library.
slug: introducing-new-js-std-lib
authors:
  - name: Thanga Ganapathy
    title: Contributor of @opentf/std
    url: https://github.com/Thanga-Ganapathy
tags:
  [introducing, new, js, javascript, typescript, std, standard, lib, library]
image: /img/blogs/playground-demo.png
hide_table_of_contents: false
---

<!-- truncate -->

![Playground Demo](/img/blogs/playground-demo.png)

Welcome,

I would like to introduce our new Javascript Standard Library [@opentf/std](https://js-std.pages.dev/), please keep on reading.

## Why a Standard Library Matters

Over the past few years, JavaScript has evolved at breakneck speed. The language has seen a proliferation of features, modules, and packages. The JavaScript projects with dependencies crisscrossing like a tangled web.

## The Quest for Simplicity

As developers, our primary goal is to find the simplest solution to a problem. Simplicity means functionality, performance, readability, and efficiency. We walk a fine line between complexity and elegance.

## The Package Proliferation Problem

Many NPM packages are one-liners—tiny snippets of code packaged up for convenience. But is this proliferation of trivial code a good thing? Not always. In the real world, it leads to issues. If a package is removed, chaos ensues. Dependencies become a house of cards, and maintaining sanity becomes a challenge.

## Features

- Simple API

- Practical Default Options

- Cross-Enviroment Compatibility: Execute seamlessly in browsers, Node.js, Bun, Deno, etc.

- Clean Code: We’ve followed best practices to ensure readability and maintainability.

- Documentation: Clear explanations and examples for every function.

- TypeScript Support

## Installation

```sh
pnpm add @opentf/std 
```

## Usage Examples
Let’s explore some of the library’s capabilities:

1. Checking if a Value is Numeric:
```js
import { isNum } from "@opentf/std";

console.log(isNum(NaN)); //=> false
```

2. Converting Strings to PascalCase:
```js
import { pascalCase } from "@opentf/std";

console.log(pascalCase("pascal case")); //=> PascalCase
```

3. Sorting an Array in Descending Order:

```js
import { sort } from "@opentf/std";

console.log(sort([1, 10, 21, 2], "desc")); //=> [21, 10, 2, 1]
```

4. Deep Cloning an Object:

```js
import { clone } from "@opentf/std";

const obj = { a: 1, b: "abc", c: new Map([["key", "val"]]) };
console.log(clone(obj)); // Deeply cloned value
```

5. Checking Equality of Objects & Arrays:

```js
import { isEql, isEqlArr } from "@opentf/std";

const mapA = new Map([["a", 1], ["b", 2]]);
const mapB = new Map([["b", 2], ["a", 1]]);
console.log(isEql(mapA, mapB)); //=> false

console.log(isEqlArr([1, 2, 3], [2, 3, 1])); //=> true
```

6. Adding a Delay (1 second) with sleep:

```js
import { sleep } from "@opentf/std";

await sleep(1000); // Suspends execution for 1 second
```

:::tip

You can try out these examples on the [Playground](https://js-std.pages.dev/playground).

:::

## Benchmarks

Some benchmark outputs are shown here for reference.

:::note

Our priorities are reliability and accuracy rather than performance.

:::

```diff
clone:
┌───┬──────────────────────────┬─────────┬────────────────────┬────────┬─────────┐
│   │ Task Name                │ ops/sec │ Average Time (ns)  │ Margin │ Samples │
├───┼──────────────────────────┼─────────┼────────────────────┼────────┼─────────┤
│ 0 │ structuredClone (Native) │ 276,824 │ 3612.3959469709525 │ ±1.29% │ 27683   │
│ 1 │ _.cloneDeep (Lodash)     │ 216,965 │ 4609.032953864744  │ ±2.41% │ 21697   │
│ 2 │ R.clone (ramda)          │ 174,567 │ 5728.439422580611  │ ±1.92% │ 17457   │
│ 3 │ R2.clone (remeda)        │ 310,268 │ 3223.0154703960834 │ ±2.40% │ 31027   │
│ 4 │ cloneDeep (clone-deep)   │ 468,908 │ 2132.611673882092  │ ±1.70% │ 46891   │
│ 5 │ copy (fast-copy)         │ 486,179 │ 2056.852050680814  │ ±1.91% │ 48618   │
+ 6 │ clone                    │ 535,302 │ 1868.1028376072306 │ ±2.07% │ 53531   │
└───┴──────────────────────────┴─────────┴────────────────────┴────────┴─────────┘
*Note:
    - Here the lodash does not support errors, sparse arrays & objects in map keys.
 
    - Here the ramda & remeda does not support cloning Map & Set.
 
    - The fast-copy does not clone objects within Map, buffers in TypedArray, sparse arrays.
 
    - The clone-deep does not handle circular refs, does not clone objects within map,
    sparse arrays, internal refs within the object, TypedArray buffers & DataView.
 
sortBy:
┌───┬────────────────────┬───────────┬───────────────────┬────────┬─────────┐
│   │ Task Name          │ ops/sec   │ Average Time (ns) │ Margin │ Samples │
├───┼────────────────────┼───────────┼───────────────────┼────────┼─────────┤
│ 0 │ _.orderBy (Lodash) │ 1,231,295 │ 812.1529684071648 │ ±3.09% │ 123130  │
│ 1 │ R.sortWith (Ramda) │ 1,279,200 │ 781.7380570822326 │ ±2.27% │ 127921  │
│ 2 │ R2.sortBy (Remeda) │ 1,419,707 │ 704.3703291518029 │ ±2.81% │ 141971  │
│ 3 │ sort (Moderndash)  │ 2,697,568 │ 370.7042634668106 │ ±1.82% │ 269757  │
+ 4 │ sortBy             │ 2,728,366 │ 366.5196435965459 │ ±2.19% │ 272837  │
└───┴────────────────────┴───────────┴───────────────────┴────────┴─────────┘
 
*Note: Here the Moderndash does not support passing object prop as string.
 
isEql:
┌───┬─────────────────────────────────────┬─────────┬────────────────────┬────────┬─────────┐
│   │ Task Name                           │ ops/sec │ Average Time (ns)  │ Margin │ Samples │
├───┼─────────────────────────────────────┼─────────┼────────────────────┼────────┼─────────┤
│ 0 │ deepStrictEqual (Native)            │ 950,686 │ 1051.871609041841  │ ±0.24% │ 95069   │
│ 1 │ fastDeepEqual (fast-deep-equal/es6) │ 652,611 │ 1532.3058134904193 │ ±1.49% │ 65262   │
│ 2 │ dequal                              │ 120,791 │ 8278.7573675501    │ ±0.74% │ 12080   │
│ 3 │ _.isEqual (Lodash)                  │ 152,075 │ 6575.660376117521  │ ±2.02% │ 15208   │
│ 4 │ R.equals (Ramda)                    │ 51,496  │ 19418.976504855284 │ ±1.70% │ 5150    │
+ 5 │ isEql                               │ 104,355 │ 9582.655710998957  │ ±1.13% │ 10436   │
└───┴─────────────────────────────────────┴─────────┴────────────────────┴────────┴─────────┘
 
*Note:
 
  - The native util `deepStrictEqual` not available in browsers, does not check `Map` ordering & same invalid dates.
  - The `fast-deep-equal/es6` does not support cyclic refs, Map ordering check, invalid dates, symbols, objects values in Set & TypedArrays.
  - The lodash `isEqual` does not check `Map` ordering & object values in `Set`.
  - The ramda `equals` does not check `Map` ordering & symbols.
  - The dequal does not support cyclic refs, Map ordering, symbols & same invalid dates.
```

## In Conclusion: A New Chapter for JavaScript

As we close this chapter on the **JS Standard Library**, we invite you to be part of our journey. The world of JavaScript development is ever-evolving, and together, we can shape it for the better. Here’s what we’d like you to take away:

- **Collaboration Matters**: Open-source projects thrive on collaboration. Whether you’re contributing code, reporting issues, or sharing ideas, your voice matters. Join us on [GitHub](https://github.com/Open-Tech-Foundation/js-std) and let’s build something remarkable.

- **Simplicity Wins**: In a sea of complexity, simplicity stands out. Our library aims to simplify your coding life, one function at a time. Embrace the elegance of clean code and watch your productivity soar.

- **Community Power**: The heart of any library is its community. We’re grateful for every developer who uses, critiques, and improves our work. Together, we can create tools that empower everyone.

- **Keep Learning**: JavaScript surprises us daily. Stay curious, explore new ideas, and never stop learning. The next breakthrough might be just a line of code away.

Thank you for being part of the JS Standard Library adventure. Let’s write the future together.

Happy coding! 🚀🔥

🙏 Thanks for reading.