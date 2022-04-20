import fs from "node:fs/promises";

// Some some TypeScript interfaces to make sure they are removed by esm-node.
interface Input {
  name: string;
  age: number;
}

export function compress(input: Input) {
  return `${input.name}#${input.age}`;
}

// Use top level await to write to a file.
await fs.writeFile("execute.output.txt", "hello world");
