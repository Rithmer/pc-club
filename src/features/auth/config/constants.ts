export const AUTH_TITLES = {
  login: "Войти в аккаунт",
  register: "Создать аккаунт",
  verify: "Подтвердить почту",
  reset: "Восстановить доступ",
} as const;
export type AuthMode = keyof typeof AUTH_TITLES;
