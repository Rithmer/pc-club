import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { api, ApiError } from "./http";

const storage = new Map<string, string>();
const originalFetch = globalThis.fetch;
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
const setStorage = (getItem: (key: string) => string | null) =>
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true, value: { getItem },
  });

describe("api", () => {
  beforeEach(() => {
    storage.clear();
    setStorage((key) => storage.get(key) ?? null);
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  });

  it("sends JSON and the saved bearer token", async () => {
    storage.set("ctrl-token", "session-token");
    let request: [string, RequestInit] | undefined;
    globalThis.fetch = (async (path: string, options: RequestInit) => {
      request = [path, options];
      return { ok: true, json: async () => ({ total: 250 }) } as Response;
    }) as typeof fetch;

    assert.deepEqual(await api("/bookings/preview", "POST", { duration: 2 }), { total: 250 });
    assert.deepEqual(request, ["/api/bookings/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer session-token" },
      body: JSON.stringify({ duration: 2 }),
    }]);
  });

  it("omits authorization when signed out and preserves API errors", async () => {
    let request: [string, RequestInit] | undefined;
    globalThis.fetch = (async (path: string, options: RequestInit) => {
      request = [path, options];
      return { ok: false, status: 401, json: async () => ({ error: "Сессия истекла" }) } as Response;
    }) as typeof fetch;

    await assert.rejects(api("/clients/me"), new ApiError("Сессия истекла", 401));
    assert.deepEqual(request, ["/api/clients/me", {
      method: "GET", headers: { "Content-Type": "application/json" },
    }]);
  });

  it("provides a fallback message when the server omits an error", async () => {
    globalThis.fetch = (async () => ({
      ok: false, status: 500, json: async () => ({}),
    } as Response)) as typeof fetch;
    await assert.rejects(api("/bookings"), new ApiError("Не удалось выполнить запрос", 500));
  });
});
