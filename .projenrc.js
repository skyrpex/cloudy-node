import { typescript, javascript } from "projen";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "cloudy-node",
  bin: {
    "cloudy-node": "./lib/cli.js",
  },
  deps: ["esbuild", "semver", "node-fetch", "cross-spawn"],
  devDeps: ["@types/semver", "@types/cross-spawn"],
  tsconfig: {
    compilerOptions: {
      noUncheckedIndexedAccess: true,
      // Since we're using ES2020, the compiled files are almost identical to the original files. There's no need to use sourcemaps.
      inlineSourceMap: false,
      inlineSources: false,
    },
  },
  // Allows using "node:" protocol. The minimum version that allows this is
  // 14.13.1, but the underlying dependencies and processes require more modern
  // versions, thus breaking projen's upgrade workflow.
  minNodeVersion: "14.18.0",
  prettier: true,
  releaseToNpm: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {},
});

// Use ESM. See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-move-my-commonjs-project-to-esm.
for (const tsconfig of [project.tsconfig, project.tsconfigDev]) {
  tsconfig.file.addOverride("compilerOptions.lib", ["ES2020"]);
  tsconfig.file.addOverride("compilerOptions.target", "ES2020");
  tsconfig.file.addOverride("compilerOptions.module", "ES2020");
  tsconfig.file.addOverride("compilerOptions.moduleResolution", "node");
}
project.addDevDeps("@types/node@^14.0.0");
project.addFields({
  type: "module",
  exports: {
    ".": {
      import: `./lib/index.js`,
      types: "./lib/index.d.ts",
    },
  },
});

project.compileTask.prependExec(
  `yarn link && cd ./test/test-app && yarn link ${project.package.packageName}`
);
project.testTask.prependExec("cd ./test/test-app && yarn");

project.synth();
