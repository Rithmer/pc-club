import { useCallback, useEffect, useState } from "react";
import type { Computer } from "../../shared/api/contracts";
import { useClubCatalog } from "./useClubCatalog";
import { useClientState } from "./useClientState";

export type Page = "club" | "tariffs" | "bookings" | "profile";

export function useClubApp() {
  const catalog = useClubCatalog();
  const account = useClientState();
  const [page, setPage] = useState<Page>("club");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Computer[]>([]);

  const refresh = useCallback(async () => {
    try {
      await Promise.all([catalog.refresh(), account.refresh()]);
      setError("");
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setLoading(false);
    }
  }, [catalog.refresh, account.refresh]);

  useEffect(() => {
    void refresh();
    const interval = setInterval(() => void refresh(), 15_000);
    return () => clearInterval(interval);
  }, [refresh]);

  const action = async (request: () => Promise<unknown>, success: string) => {
    setBusy(true);
    try {
      await request();
      setToast(success);
      await refresh();
    } catch (reason) {
      setToast((reason as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const choose = (computer: Computer) => {
    if (computer.status !== "free") return;
    setSelected((current) => current.some((item) => item.id === computer.id)
      ? current.filter((item) => item.id !== computer.id)
      : [...current, computer]);
  };
  const navigate = (next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return {
    ...catalog, ...account, page, loading, error, busy, toast, filter, selected,
    refresh, setToast, setFilter, setSelected, choose, navigate, action,
  };
}
