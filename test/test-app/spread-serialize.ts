import { runtime } from "@pulumi/pulumi";

// The spread used in this function is usually transpiled by esbuild with
// helpers that won't work with Pulumi's serializeFunction. Let's test that
// it works with our solution.
function spread() {
  return {
    ...{ a: "a" },
    ...{ b: "b" },
  };
}

await runtime.serializeFunction(() => spread());
