import type { Computer } from "../../../shared/api/contracts";
export interface BookingDialogProps {
  open: boolean;
  selected: Computer[];
  busy: boolean;
  onClose: () => void;
  onBooked: () => void;
}
export interface BookingDraft {
  startAt: string;
  duration: number;
}
