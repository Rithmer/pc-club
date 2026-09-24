import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AUTH_TITLES } from "../config/constants";
import { useAuthForm } from "../model/useAuthForm";
import type { AuthDialogProps } from "../model/types";
export default function AuthDialog({
  open,
  initialMode,
  busy,
  onClose,
  onSuccess,
  onMessage,
}: AuthDialogProps) {
  const { mode, setMode, fields, setField, error, submit, clearError } =
    useAuthForm(initialMode, open, onSuccess, onMessage);
  return (
    <Dialog
      open={open}
      onClose={() => !busy && onClose()}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>{AUTH_TITLES[mode]}</DialogTitle>
      <DialogContent>
        <form
          id="auth-form"
          className="dialog-form"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          {mode === "register" && (
            <TextField
              required
              label="ФИО"
              value={fields.fullName}
              onChange={(event) => setField("fullName", event.target.value)}
            />
          )}
          <TextField
            required
            label="Электронная почта"
            type="email"
            value={fields.email}
            onChange={(event) => setField("email", event.target.value)}
          />
          {["login", "verify"].includes(mode) && (
            <TextField
              required
              label="Код подтверждения"
              value={fields.code}
              onChange={(event) => setField("code", event.target.value)}
            />
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Alert severity="info">Демо-режим: код подтверждения 1234. Письма не отправляются.</Alert>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setMode(mode === "register" ? "login" : "register");
            clearError();
          }}
        >
          {mode === "register" ? "Уже есть аккаунт" : "Регистрация"}
        </Button>
        <Button
          form="auth-form"
          type="submit"
          disabled={busy}
          variant="contained"
        >
          {mode === "register"
            ? "Создать"
            : mode === "reset"
              ? "Получить инструкции"
              : "Продолжить"}
        </Button>
      </DialogActions>
      <Button
        onClick={() => {
          setMode("reset");
          clearError();
        }}
        sx={{ mb: 2 }}
      >
        Восстановить доступ
      </Button>
    </Dialog>
  );
}
