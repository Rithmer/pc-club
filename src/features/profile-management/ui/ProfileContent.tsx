import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Icon from "../../../shared/ui/Icon";
import type { Client } from "../../../shared/api/contracts";

export default function ProfileContent({
  client,
  busy,
  onSave,
  onLogout,
}: {
  client: Client;
  busy: boolean;
  onSave: (data: { fullName: string; email: string }) => void;
  onLogout: () => void;
}) {
  const [fullName, setFullName] = useState(client.fullName),
    [email, setEmail] = useState(client.email);
  return (
    <div className="profile-grid">
      <section className="profile-card">
        <span className="avatar large">{client.fullName[0]}</span>
        <h2>{client.fullName}</h2>
        <p>
          {client.email} · {client.role === "admin" ? "Администратор" : "Игрок"}
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave({ fullName, email });
          }}
        >
          <TextField
            fullWidth
            required
            label="ФИО"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Электронная почта"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            disabled={busy}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Сохранить
          </Button>
        </form>
        <Button
          color="inherit"
          sx={{ mt: 3 }}
          startIcon={<Icon name="logout" />}
          onClick={onLogout}
        >
          Выйти из аккаунта
        </Button>
      </section>
      <section className="profile-card">
        <Icon name="wallet" size={30} />
        <p>Баланс аккаунта</p>
        <h2 className="big-balance">
          {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            maximumFractionDigits: 0,
          }).format(client.balance)}
        </h2>
        <p className="muted">
          Баланс рассчитывается и изменяется только сервером: при оплате,
          возврате и продлении сессии.
        </p>
      </section>
    </div>
  );
}
