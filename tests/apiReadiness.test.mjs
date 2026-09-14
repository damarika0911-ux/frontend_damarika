import assert from "node:assert/strict";
import { test } from "node:test";
import { createApiReadiness } from "../src/service/apiReadiness.ts";

test("startup and concurrent requests share one check and release together", async () => {
  let resolveCheck;
  let checks = 0;
  let released = 0;
  const gate = createApiReadiness(() => {
    checks++;
    return new Promise((resolve) => { resolveCheck = resolve; });
  });
  const startup = gate.waitUntilReady();
  const requests = Array.from({ length: 4 }, () =>
    gate.waitUntilReady().then(() => { released++; }),
  );
  await Promise.resolve();
  assert.equal(checks, 1);
  assert.equal(released, 0);
  resolveCheck();
  await Promise.all([startup, ...requests]);
  assert.equal(released, 4);
  await gate.waitUntilReady();
  assert.equal(checks, 1);
});

test("a failed or timed-out health request rejects waiters and allows retry", async () => {
  let checks = 0;
  const gate = createApiReadiness(async () => {
    if (++checks === 1) throw new Error("timeout");
  });
  const results = await Promise.allSettled([
    gate.waitUntilReady(), gate.waitUntilReady(),
  ]);
  assert.ok(results.every((result) => result.status === "rejected"));
  assert.equal(checks, 1);
  await gate.waitUntilReady();
  assert.equal(checks, 2);
});

test("successful traffic postpones the next check; idle tabs recheck on demand", async (t) => {
  let now = 0;
  t.mock.method(Date, "now", () => now);
  let checks = 0;
  const gate = createApiReadiness(async () => { checks++; });
  await gate.waitUntilReady();
  now += 13 * 60 * 1000;
  gate.markActivity();
  now += 13 * 60 * 1000;
  await gate.waitUntilReady();
  assert.equal(checks, 1);
  now += 60 * 1000;
  await Promise.all([gate.waitUntilReady(), gate.waitUntilReady()]);
  assert.equal(checks, 2);
});
