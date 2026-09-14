import assert from "node:assert/strict";
import { test } from "node:test";
import { MutationObserver } from "@tanstack/react-query";
import { queryClient } from "../src/service/queryClient.ts";
import { ApiError, fetchJson } from "../src/service/http.ts";

test("concurrent screens share one request and fresh navigation reuses the cache", async () => {
  let calls = 0;
  let finish;
  const options = { queryKey: ["cache-test"], queryFn: () => {
    calls++;
    return new Promise((resolve) => { finish = resolve; });
  }};
  const first = queryClient.fetchQuery(options);
  const second = queryClient.fetchQuery(options);
  assert.equal(calls, 1);
  finish([{ id: 1 }]);
  assert.deepEqual(await first, await second);
  await queryClient.fetchQuery(options);
  assert.equal(calls, 1);
  queryClient.clear();
});

test("contact mutations do not automatically repeat a failed submission", async () => {
  let calls = 0;
  const mutation = new MutationObserver(queryClient, {
    mutationFn: async () => { calls++; throw new Error("Connection lost"); },
  });
  await assert.rejects(mutation.mutate({ message: "Hello" }), /Connection lost/);
  assert.equal(calls, 1);
  queryClient.clear();
});

test("query retry policy stops client errors and bounds transient retries", () => {
  const retry = queryClient.getDefaultOptions().queries.retry;
  assert.equal(retry(0, new ApiError("Invalid", 400)), false);
  assert.equal(retry(0, new ApiError("Unavailable", 503)), true);
  assert.equal(retry(1, new Error("Network")), false);
});

test("fetch preserves server error messages and rejects invalid JSON", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ message: "Invalid email" }), { status: 400 }));
  await assert.rejects(fetchJson("https://example.test"), (error) => error.status === 400 && error.message === "Invalid email");
  globalThis.fetch.mock.mockImplementation(async () => new Response("<html>Starting</html>"));
  await assert.rejects(fetchJson("https://example.test"), /invalid response/);
});

test("fetch timeout aborts the network request", async (t) => {
  t.mock.method(globalThis, "fetch", (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(new Error("Aborted")), { once: true });
  }));
  await assert.rejects(fetchJson("https://example.test", {}, 5), (error) => error.status === 408);
});
