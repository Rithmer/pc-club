import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { money } from "../../../shared/lib/format";
import { BOOKING_DURATIONS } from "../config/constants";
import { useBookingDraft } from "../model/useBookingDraft";
import type { BookingDialogProps } from "../model/types";
export default function BookingDialog({
  open,
  selected,
  busy,
  onClose,
  onBooked,
}: BookingDialogProps) {
  const { startAt, setStartAt, duration, setDuration, quote, error, submit } =
    useBookingDraft(open, selected, onBooked);
  return (
    <Dialog
      open={open}
      onClose={() => !busy && onClose()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Новое бронирование</DialogTitle>
      <DialogContent>
        <div className="dialog-form">
          <p>{selected.map((pc) => pc.name).join(" · ")}</p>
          <TextField
            label="Дата и время"
            type="datetime-local"
            value={startAt}
            onChange={(event) => setStartAt(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            select
            label="Продолжительность"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          >
            {BOOKING_DURATIONS.map((hours) => (
              <MenuItem key={hours} value={hours}>
                {hours} ч.
              </MenuItem>
            ))}
          </TextField>
          {error && <Alert severity="error">{error}</Alert>}
          <div className="quote-total">
            <span>Итого</span>
            <strong>{quote === null ? "Рассчитываем…" : money(quote)}</strong>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Назад
        </Button>
        <Button
          variant="contained"
          disabled={busy || quote === null || !!error}
          onClick={() => void submit()}
        >
          Подтвердить бронь
        </Button>
      </DialogActions>
    </Dialog>
  );
}
