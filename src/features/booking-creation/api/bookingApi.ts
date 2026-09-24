import { api } from "../../../shared/api/http";
import type { BookingDraft } from "../model/types";
export const previewBooking = (computerIds: string[], draft: BookingDraft) =>
  api<{ total: number }>("/bookings/preview", "POST", {
    computerIds,
    ...draft,
  });
export const createBooking = (computerIds: string[], draft: BookingDraft) =>
  api(computerIds.length > 1 ? "/bookings/group" : "/bookings", "POST", {
    computerIds,
    ...draft,
  });
