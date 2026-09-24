import { useEffect, useState } from "react";
import { requestReset, register, signIn } from "../api/authApi";
import type { AuthMode } from "../config/constants";
import type { AuthFields } from "./types";
export function useAuthForm(
  initialMode: "login" | "register",
  open: boolean,
  onSuccess: (
    client: import("../../../shared/api/contracts").Client,
    token: string,
  ) => void,
  onMessage: (message: string) => void,
) {
  const [mode, setMode] = useState<AuthMode>(initialMode),
    [fields, setFields] = useState<AuthFields>({
      email: "",
      fullName: "",
      code: "",
    }),
    [error, setError] = useState("");
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError("");
    }
  }, [initialMode, open]);
  const setField = (key: keyof AuthFields, value: string) =>
    setFields((current) => ({ ...current, [key]: value }));
  const submit = async () => {
    setError("");
    try {
      if (mode === "register") {
        await register(fields);
        setMode("verify");
        onMessage("Аккаунт создан. Подтвердите электронную почту.");
        return;
      }
      if (mode === "reset") {
        await requestReset(fields.email);
        setMode("login");
        onMessage("Инструкции по восстановлению отправлены.");
        return;
      }
      const result = await signIn(
        mode === "verify" ? "/auth/verify-email" : "/auth/login",
        fields,
      );
      onSuccess(result.client, result.token);
    } catch (reason) {
      setError((reason as Error).message);
    }
  };
  return {
    mode,
    setMode,
    fields,
    setField,
    error,
    submit,
    clearError: () => setError(""),
  };
}
