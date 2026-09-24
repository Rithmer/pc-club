import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Computer, DeviceType } from "../../../shared/api/contracts";
import { interleaveByDeviceType, matchesFilter } from "./catalog";

const device = (id: string, deviceType: DeviceType, tariff = "standard"): Computer => ({
  id, deviceType, tariff, name: id, zone: "main", status: "free",
  gpu: "", cpu: "", ram: "", monitor: "", pricePerHour: 100,
});

describe("catalog filters", () => {
  const pc = device("pc", "pc", "premium");
  const consoleDevice = device("ps", "ps");

  it("filters by device type and tariff", () => {
    assert.equal(matchesFilter(pc, "all"), true);
    assert.equal(matchesFilter(pc, "pc"), true);
    assert.equal(matchesFilter(consoleDevice, "pc"), false);
    assert.equal(matchesFilter(consoleDevice, "ps"), true);
    assert.equal(matchesFilter(pc, "premium"), true);
    assert.equal(matchesFilter(consoleDevice, "premium"), false);
  });
});

describe("catalog ordering", () => {
  it("alternates device types without losing devices from uneven groups", () => {
    const devices = [
      device("pc-1", "pc"), device("pc-2", "pc"), device("pc-3", "pc"),
      device("ps-1", "ps"), device("vr-1", "vr"), device("arcade-1", "arcade"),
    ];
    assert.deepEqual(interleaveByDeviceType(devices).map(({ id }) => id), [
      "pc-1", "ps-1", "arcade-1", "vr-1", "pc-2", "pc-3",
    ]);
  });

  it("returns an empty catalog when there are no devices", () => {
    assert.deepEqual(interleaveByDeviceType([]), []);
  });
});
