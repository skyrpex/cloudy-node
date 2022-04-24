import child_process from "node:child_process";
import fs from "node:fs";

test("executes the file", () => {
  const outputFile = `${__dirname}/execute.output.txt`;
  fs.rmSync(outputFile, { force: true });

  const { status } = child_process.spawnSync(
    "yarn",
    ["cloudy-node", "execute.ts"],
    {
      cwd: __dirname,
    }
  );
  expect(status).toBe(0);
  expect(fs.readFileSync(outputFile).toLocaleString()).toBe("hello world");
});
