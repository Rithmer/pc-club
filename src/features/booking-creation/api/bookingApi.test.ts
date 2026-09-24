import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { createBooking, previewBooking } from "./bookingApi";

const draft = { startAt: "2026-09-24T15:00", duration: 2 };
const originalFetch = globalThis.fetch;
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");

describe("booking requests", () => {
  let request: [string, RequestInit] | undefined;
  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
    request = undefined;
  });

  const mockRequest = () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true, value: { getItem: () => null },
    });
    globalThis.fetch = (async (path: string, options: RequestInit) => {
      request = [path, options];
      return { ok: true, json: async () => ({ total: 400 }) } as Response;
    }) as typeof fetch;
  };

  it("previews the selected devices and duration", async () => {
    mockRequest();
    await previewBooking(["pc-1", "pc-2"], draft);
    assert.equal(request?.[0], "/api/bookings/preview");
    assert.deepEqual(JSON.parse(String(request?.[1].body)), {
      computerIds: ["pc-1", "pc-2"], ...draft,
    });
  });

  for (const [computerIds, path] of [
    [["pc-1"], "/api/bookings"],
    [["pc-1", "pc-2"], "/api/bookings/group"],
  ] as const) {
    it(`uses ${path} for ${computerIds.length} device(s)`, async () => {
      mockRequest();
      await createBooking([...computerIds], draft);
      assert.equal(request?.[0], path);
      assert.equal(request?.[1].method, "POST");
      assert.deepEqual(JSON.parse(String(request?.[1].body)), { computerIds, ...draft });
    });
  }
});
