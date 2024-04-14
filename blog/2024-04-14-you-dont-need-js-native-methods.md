---
title: You Don’t Need JavaScript Native Methods
description: I'm sure you have came across something like `You don't need Lodash/Underscore`, but this is opposite.
slug: you-dont-need-js-native-methods
authors:
  - name: Thanga Ganapathy
    title: Contributor of @opentf/std
    url: https://github.com/Thanga-Ganapathy
tags: [js, javascript, typescript, std, standard, lib, library, native, method]
image: /img/blogs/you-dont-need-js-native-methods.png
hide_table_of_contents: false
---

<!-- truncate -->

![Title text image](../static/img/blogs/you-dont-need-js-native-methods.png)

Welcome,

I'm sure you have come across something like, You don't need `Lodash`, `Underscore` or `Ramda`, but this is the `opposite`.

When `ES6` came, people got excited and started using native JS methods instead of using utility lib functions for various reasons like performance, size reduction, dependencies-free, etc.

## Context

I recommend you check out this post, [Introducing Our New JavaScript Standard Library]((https://open-tech-foundation.pages.dev/blog/introducing-new-js-std-lib)), to learn more about the JS library [@opentf/std](https://js-std.pages.dev/), which we will be using throughout this article.

## Why

Let us explain why again you need to reverse it when using a standard library like [@opentf/std](https://js-std.pages.dev/).

- Works across runtime environments (Browsers, Node.js, Deno, Bun, etc)
- Consistent & Concise function names
- Helpful in functions compostion (Pipe or Compose)
- Supports some older browsers & Node.js >=16
- Avoids polyfills

## Examples

Let us compare some `native` methods vs `@opentf/std` functions.

### 1. Array.prototype.toReversed()

- ✅ Browsers: Baseline 2023
- ✅ Node.js: 20.0.0

```js
import { reverse } from "@opentf/std";

const items = [1, 2, 3];
items.toReversed(); //=> [3, 2, 1]

reverse(items); //=> [3, 2, 1]
```

### 2. Array.prototype.toSorted()

- ✅ Browsers: Baseline 2023
- ✅ Node.js: 20.0.0

```js
import { sort } from "@opentf/std";

const values = [1, 10, 21, 2];

values.toSorted((a, b) => b - a); //=> [ 21, 10, 2, 1 ]

sort(values, "desc"); //=> [ 21, 10, 2, 1 ]
```

### 3. Array.prototype.toSpliced()

- ✅ Browsers: Baseline 2023
- ✅ Node.js: 20.0.0

```js
import { arrIns, arrRm, arrReplace } from "@opentf/std";

const months = ["Jan", "Mar", "Apr", "May"];

// Inserting an element at index 1
const months2 = months.toSpliced(1, 0, "Feb");
//=> ["Jan", "Feb", "Mar", "Apr", "May"]
const m2 = arrIns(months, 1, "Feb");
//=> ["Jan", "Feb", "Mar", "Apr", "May"]

// Deleting two elements starting from index 2
const months3 = months2.toSpliced(2, 2);
//=> ["Jan", "Feb", "May"]
const m3 = arrRm(m2, 2, 2);
//=> ["Jan", "Feb", "May"]

// Replacing one element at index 1 with two new elements
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
//=> ["Jan", "Feb", "Mar", "May"]
const m4 = arrReplace(m3, 1, 1, "Feb", "Mar");
//=> ["Jan", "Feb", "Mar", "May"]
```

### 4. Object.groupBy()

- ✅ Browsers: Baseline 2024
- ✅ Node.js: 21.0.0

```js
import { groupBy } from "@opentf/std";

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 5 },
  { name: "bananas", type: "fruit", quantity: 0 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 5 },
  { name: "fish", type: "meat", quantity: 22 },
];

Object.groupBy(inventory, ({ type }) => type);
/*
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/

groupBy(inventory, "type");
/*
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
```

### 5. Array Unique

```js
import { uniq } from "@opentf/std";

const arr = [2, 1, 2];

[...new Set(arr)]; //=> [2, 1]

uniq(arr); //=> [2, 1]
```

### 6. Set.prototype.intersection()

Here we need `Set` intersection method for finding intersecting values in arrays.

- ⚠️ Browsers: Limited availability
- ❌ Node.js: Not available

```js
import { intersection } from "@opentf/std";

const odds = [1, 3, 5, 7, 9];
const squares = [1, 4, 9];

const result = new Set(odds).intersection(new Set(squares));
[...result]; //=> [1, 9]

intersection([odds, squares]); //=> [1, 9]
```

### 7. Async/Await With Array.prototype.map()

```js
import { aMap } from "@opentf/std";

const arr = [1, 2, 3, 4, 5];

function multiply(n, i) {
  return Promise.resolve(n * i);
}

async function main(params) {
  // Using Promise, runs in parallel
  let result = await Promise.all(arr.map((e, i) => multiply(e, i)));
  console.log(result); //=> [ 0, 2, 6, 12, 20 ]

  // Using for...of, runs in sequence
  result = [];
  let i = 0;
  for (const n of arr) {
    result.push(await multiply(n, i));
    i++;
  }
  console.log(result); //=> [ 0, 2, 6, 12, 20 ]

  // Using aMap, runs in sequence
  result = await aMap(arr, async (n, i) => await multiply(n, i));
  console.log(result); //=> [ 0, 2, 6, 12, 20 ]
}

main();
```

### 8. structuredClone() global function

- ✅ Browsers: Baseline 2022
- ✅ Node.js: 17.0.0

```js
import { clone } from "@opentf/std";

const obj = {
  arr: [1, 2, 3],
  obj: {
    a: "abc",
    b: new Map([
      ["a", 1],
      ["b", 2],
    ]),
  },
  date: new Date(),
};

structuredClone(obj); // Returns a deeply clone value

clone(obj); // Returns a deeply clone value
```

### 9. Object.prototype.hasOwnProperty() & Object.hasOwn()

```js
import { has } from "@opentf/std";

const foo = Object.create(null);
foo.prop = "exists";
foo.a = { b: 1 };

foo.hasOwnProperty("prop"); // Uncaught TypeError: foo.hasOwnProperty is not a function

Object.hasOwn(foo, "prop"); //=> true
Object.hasOwn(foo, "a.b"); //=> false

has(foo, "prop"); //=> true
has(foo, "a.b"); //=> true
has(foo, "a.c"); //=> false
```

### 10. Number.isFinite() & global isFinite()

```js
import { isNum } from "@opentf/std";

Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite(-Infinity); // false
Number.isFinite(0); // true
Number.isFinite(2e64); // true
Number.isFinite("0"); // false

isFinite("0"); // true; coerced to number 0

isNum(Infinity); // false
isNum(NaN); // false
isNum(-Infinity); // false
isNum(0); // true
isNum(2e64); // true
isNum("0"); // false
isNum("0", true); // true; coerced to number 0
```

## Conclusion

In this exploration of JavaScript native methods and their alternatives, we’ve discovered the power of the @opentf/std library. By replacing native functions with well-tested alternatives, developers can achieve cleaner, more efficient code.

If you need to find out the performance of the lib, please check out this [benchmarks](https://js-std.pages.dev/#benchmarks).

Another important thing to `note` here is that we don't say you should stop using regular array `map`, `filter`, or `reduce` methods, but the external library is not bad at all and will give you some benefits from using it.

As you continue your coding journey, consider adopting these alternatives and contributing to the open-source ecosystem.

Remember that collaboration and community involvement play a crucial role in advancing our collective knowledge.

Happy coding! 🚀

🙏 Thanks for reading.