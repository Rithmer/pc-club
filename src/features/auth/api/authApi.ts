import { api } from "../../../shared/api/http";
import type { Client } from "../../../shared/api/contracts";
export const register = (data: { fullName: string; email: string }) =>
  api("/auth/register", "POST", data);
export const requestReset = (email: string) =>
  api("/auth/reset-password", "POST", { email });
export const signIn = (
  path: "/auth/login" | "/auth/verify-email",
  data: { email: string; code: string },
) => api<{ token: string; client: Client }>(path, "POST", data);
