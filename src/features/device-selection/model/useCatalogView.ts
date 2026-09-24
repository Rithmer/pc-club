import { useMemo, useState } from "react";
import type { Computer } from "../../../shared/api/contracts";
import { interleaveByDeviceType, matchesFilter } from "../lib/catalog";
export function useCatalogView(devices: Computer[], filter: string) {
  const [view, setView] = useState<"catalog" | "map">("catalog"),
    [availability, setAvailability] = useState("free");
  const filtered = useMemo(
    () =>
      devices.filter(
        (device) =>
          matchesFilter(device, filter) && device.status === availability,
      ),
    [availability, devices, filter],
  );
  const catalogDevices = useMemo(
    () => (filter === "all" ? interleaveByDeviceType(filtered) : filtered),
    [filter, filtered],
  );
  return {
    view,
    setView,
    availability,
    setAvailability,
    filtered,
    catalogDevices,
    activeFilter: devices.some((device) => device.tariff === filter && device.deviceType === "pc") ? "pc" : filter,
  };
}
