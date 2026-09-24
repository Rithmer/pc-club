import { Button } from "@mui/material";
import Icon from "./Icon";

export default function LoginRequired({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="empty">
      <Icon name="user" size={42} />
      <h3>Твоя игра начинается здесь</h3>
      <p>Войди по электронной почте, чтобы продолжить.</p>
      <Button variant="contained" onClick={onLogin}>
        Войти в аккаунт
      </Button>
    </div>
  );
}
