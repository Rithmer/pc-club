import { useCallback, useState } from "react";
import { api } from "../../shared/api/http";
import type { ClubLayout, Computer, Tariff } from "../../shared/api/contracts";

export function useClubCatalog() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [layout, setLayout] = useState<ClubLayout | null>(null);
  const refresh = useCallback(async () => {
    const [devices, plans, clubLayout] = await Promise.all([
      api<Computer[]>("/computers"),
      api<Tariff[]>("/tariffs"),
      api<ClubLayout>("/layout"),
    ]);
    setComputers(devices);
    setTariffs(plans);
    setLayout(clubLayout);
  }, []);
  return { computers, tariffs, layout, refresh };
}
