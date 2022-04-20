import child_process from "node:child_process";

test("allows running Pulumi's functionSerialize while using spread syntax", () => {
  const { status } = child_process.spawnSync(
    "yarn",
    ["esm-node", "spread-serialize.ts"],
    {
      cwd: __dirname,
    }
  );
  expect(status).toBe(0);
});
