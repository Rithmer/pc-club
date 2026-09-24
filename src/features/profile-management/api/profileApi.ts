import { api } from "../../../shared/api/http";
export const updateProfile = (data: { fullName: string; email: string }) =>
  api("/clients/me", "PATCH", data);
