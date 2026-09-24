import type { Computer } from "../../../shared/api/contracts";
import { DEVICE_TYPES } from "../config/constants";
export const matchesFilter = (device: Computer, filter: string) =>
  filter === "all" ||
  (filter === "pc" ? device.deviceType === "pc" : device.deviceType === filter || device.tariff === filter);
export const interleaveByDeviceType = (devices: Computer[]) => {
  const groups = DEVICE_TYPES.map((type) =>
    devices.filter((device) => device.deviceType === type),
  );
  return Array.from(
    { length: Math.max(0, ...groups.map((group) => group.length)) },
    (_, index) =>
      groups
        .map((group) => group[index])
        .filter((device): device is Computer => Boolean(device)),
  ).flat();
};
