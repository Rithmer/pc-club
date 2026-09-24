import { api } from "../../../shared/api/http";
export const applyPromo = (bookingId: string, code: string) =>
  api("/promo/apply", "POST", { bookingId, code });
export const payOnline = (bookingId: string) =>
  api("/payments/online", "POST", { bookingId });
export const confirmBooking = (bookingId: string) =>
  api(`/bookings/${bookingId}/confirm`, "POST", { status: "confirmed" });
export const payCash = (bookingId: string) =>
  api("/payments", "POST", { bookingId });
export const startSession = (bookingId: string) =>
  api("/sessions", "POST", { bookingId });
export const cancelBooking = (bookingId: string) =>
  api(`/bookings/${bookingId}/cancel`, "POST");
export const extendSession = (sessionId: string, duration: number) =>
  api(`/sessions/${sessionId}/extend`, "POST", { duration });
export const finishSession = (sessionId: string) =>
  api(`/sessions/${sessionId}/finish`, "POST");
