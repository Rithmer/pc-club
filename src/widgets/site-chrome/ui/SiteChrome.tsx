import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useColorMode } from "../../../app/providers/theme";
import type { Client } from "../../../shared/api/contracts";
import { money } from "../../../shared/lib/format";
import Icon from "../../../shared/ui/Icon";
const navigation = [
  ["club", "Игровой клуб"],
  ["tariffs", "Тарифы"],
  ["bookings", "Бронирования"],
];
export function SiteHeader({
  page,
  client,
  onNavigate,
  onLogin,
  onRegister,
}: {
  page: string;
  client: Client | null;
  onNavigate: (page: string) => void;
  onLogin: () => void;
  onRegister: () => void;
}) {
  const { mode, toggle } = useColorMode();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <header className="site-header">
        <div className="header-container">
          <a
            className="brand"
            href="#club"
            aria-label="CTRL — главная"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("club");
            }}
          >
            ctrl<span className="brand-dot">.</span>
          </a>
          <nav className="primary-nav" aria-label="Основная навигация">
            {navigation.map(([id, label]) => (
              <a
                key={id}
                aria-label={label}
                href={`#${id}`}
                aria-current={page === id ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Tooltip title={mode === "light" ? "Тёмная тема" : "Светлая тема"}>
              <IconButton
                className="theme-toggle"
                aria-label={
                  mode === "light"
                    ? "Включить тёмную тему"
                    : "Включить светлую тему"
                }
                onClick={toggle}
              >
                <Icon name={mode === "light" ? "moon" : "sun"} />
              </IconButton>
            </Tooltip>
            {client ? (
              <button
                className="avatar-button"
                aria-label="Открыть профиль"
                onClick={() => onNavigate("profile")}
              >
                <span className="balance-small">{money(client.balance)}</span>
                <span className="avatar">{client.fullName[0]}</span>
              </button>
            ) : (
              <>
                <Button
                  className="login-button"
                  variant="outlined"
                  size="small"
                  onClick={onLogin}
                >
                  Войти
                </Button>
                <Button
                  className="register-button"
                  variant="contained"
                  size="small"
                  onClick={onRegister}
                >
                  Авторизоваться
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
export function SiteFooter({
  onNavigate,
  onHelp,
}: {
  onNavigate: (page: string) => void;
  onHelp: () => void;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-about">
            <a
              className="brand"
              href="#club"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("club");
              }}
            >
              ctrl<span className="brand-dot">.</span>
            </a>
            <p>ПК. PlayStation. Arcade. VR.</p>
          </div>
          <div className="footer-column">
            <h3>Клуб</h3>
            <button onClick={() => onNavigate("club")}>
              Каталог устройств
            </button>
            <button onClick={() => onNavigate("tariffs")}>Зоны и тарифы</button>
            <button onClick={() => onNavigate("club")}>
              Забронировать место
            </button>
          </div>
          <div className="footer-column">
            <h3>Игроку</h3>
            <button onClick={() => onNavigate("bookings")}>
              Мои бронирования
            </button>
            <button onClick={() => onNavigate("profile")}>
              Баланс аккаунта
            </button>
          </div>
          <div className="footer-column">
            <h3>Поддержка</h3>
            <button onClick={onHelp}>Как забронировать</button>
            <button onClick={onHelp}>Оплата и отмена</button>
            <button onClick={onHelp}>Нужна помощь?</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CTRL. Компьютерный клуб.</span>
          <span>Твоя игра начинается здесь.</span>
        </div>
      </div>
    </footer>
  );
}
export function HelpWidget({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <Tooltip title="Нужна помощь?" placement="left">
        <Fab
          className="help-fab"
          color="primary"
          aria-label="Нужна помощь?"
          aria-haspopup="dialog"
          onClick={onOpen}
        >
          <Icon name="headset" size={24} />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="help-title"
      >
        <DialogTitle id="help-title" className="help-title">
          <span>
            <Icon name="headset" /> Нужна помощь?
          </span>
          <IconButton aria-label="Закрыть помощь" onClick={onClose}>
            <Icon name="close" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p className="help-intro">Всё, что нужно знать перед игрой.</p>
          <div className="help-topics">
            <details open>
              <summary>Как забронировать место?</summary>
              <p>
                Выбери устройство в каталоге или на карте, войди по почте и
                нажми «Забронировать». Укажи дату и длительность — стоимость
                появится до подтверждения.
              </p>
            </details>
            <details>
              <summary>Можно прийти всей командой?</summary>
              <p>
                Да. Выбери несколько соседних мест в одной зоне и оформи одну
                бронь.
              </p>
            </details>
            <details>
              <summary>Как оплатить или отменить бронь?</summary>
              <p>
                В разделе «Бронирования» можно применить промокод, оплатить или
                отменить бронь до начала сессии. При отмене оплаченной брони
                сумма возвращается на баланс аккаунта. В текущей версии оплата
                тестовая.
              </p>
            </details>
            <details>
              <summary>Как связаться с администратором?</summary>
              <p>
                Обратись к администратору на стойке клуба. Он поможет выбрать
                место, подтвердить бронь и начать игровую сессию.
              </p>
            </details>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
