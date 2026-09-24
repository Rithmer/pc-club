import { useCallback, useState } from "react";
import { api, ApiError } from "../../shared/api/http";
import type { Booking, Client, Session } from "../../shared/api/contracts";

export function useClientState() {
  const [client, setClient] = useState<Client | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const logout = useCallback(() => {
    localStorage.removeItem("ctrl-token");
    setClient(null);
    setBookings([]);
    setSessions([]);
  }, []);
  const refresh = useCallback(async () => {
    const token = localStorage.getItem("ctrl-token");
    if (!token) return;
    try {
      const currentClient = await api<Client>("/clients/me");
      const [clientBookings, activeSessions] = await Promise.all([
        api<Booking[]>("/bookings"),
        api<Session[]>("/sessions/active"),
      ]);
      if (localStorage.getItem("ctrl-token") !== token) return;
      setClient(currentClient);
      setBookings(clientBookings);
      setSessions(activeSessions);
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 401 && localStorage.getItem("ctrl-token") === token) logout();
      else throw reason;
    }
  }, [logout]);
  return { client, bookings, sessions, setClient, logout, refresh };
}
