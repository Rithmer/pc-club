import { useEffect, useState } from "react";
import { createBooking, previewBooking } from "../api/bookingApi";
import { QUOTE_DEBOUNCE_MS } from "../config/constants";
import { nextBookingSlot } from "../../../shared/lib/date";
import type { Computer } from "../../../shared/api/contracts";
export function useBookingDraft(
  open: boolean,
  selected: Computer[],
  onBooked: () => void,
) {
  const [startAt, setStartAt] = useState(nextBookingSlot),
    [duration, setDuration] = useState(2),
    [quote, setQuote] = useState<number | null>(null),
    [error, setError] = useState("");
  const computerIds = selected.map((computer) => computer.id);
  useEffect(() => {
    if (!open || !computerIds.length) return;
    let active = true;
    setQuote(null);
    const timer = setTimeout(
      () =>
        void previewBooking(computerIds, { startAt, duration })
          .then((result) => {
            if (active) {
              setQuote(result.total);
              setError("");
            }
          })
          .catch((reason) => active && setError((reason as Error).message)),
      QUOTE_DEBOUNCE_MS,
    );
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [open, startAt, duration, selected]);
  const submit = async () => {
    try {
      await createBooking(computerIds, { startAt, duration });
      onBooked();
    } catch (reason) {
      setError((reason as Error).message);
    }
  };
  return { startAt, setStartAt, duration, setDuration, quote, error, submit };
}
