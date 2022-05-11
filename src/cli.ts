#!/usr/bin/env node
import spawn from "cross-spawn";

const argv = process.argv.slice(2);
// const path = "cloudy-node";
const path = `file:${__dirname}/index.js`;
process.exit(
  spawn.sync("node", ["--loader", path, ...argv], { stdio: "inherit" })
    .status ?? 0
);
