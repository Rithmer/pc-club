import type { Client } from "../../../shared/api/contracts";
export interface AuthDialogProps {
  open: boolean;
  initialMode: "login" | "register";
  busy: boolean;
  onClose: () => void;
  onSuccess: (client: Client, token: string) => void;
  onMessage: (message: string) => void;
}
export interface AuthFields {
  email: string;
  fullName: string;
  code: string;
}
