# cloudy-node

TypeScript and ESM node runtime powered by esbuild.

[![NPM version](https://img.shields.io/npm/v/cloudy-node/latest.svg)](https://www.npmjs.com/package/cloudy-node)
[![NPM downloads](https://img.shields.io/npm/dm/cloudy-node.svg)](https://www.npmjs.com/package/cloudy-node)
[![Build status](https://img.shields.io/github/workflow/status/skyrpex/cloudy-ts-esm-node/release)](https://www.npmjs.com/package/cloudy-node)

## Installation

```sh
yarn add cloudy-node
```

## Usage

```sh
yarn esm-node index.ts
```

Or manually:

```sh
node --loader cloudy-node index.ts
```

## Motivation

The implementation is a fork of [antfu's esno](https://github.com/antfu/esno), but changes the [esbuild](https://github.com/evanw/esbuild) target to `es2022`.

The main reason to do so is that `esno` will generate helpers that break Pulumi's function serialization when spreading objects. Another reason is that `es2022` allows using top level await, which is supported by AWS Lambda with Node.js 14.
