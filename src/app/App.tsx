import { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import type { Client } from "../shared/api/contracts";
import { updateProfile } from "../features/profile-management/api/profileApi";
import { SiteFooter, SiteHeader, HelpWidget } from "../widgets/site-chrome/ui/SiteChrome";
import AuthDialog from "../features/auth/ui/AuthDialog";
import BookingDialog from "../features/booking-creation/ui/BookingDialog";
import ClubPage from "../pages/club/ui/ClubPage";
import TariffsPage from "../pages/tariffs/ui/TariffsPage";
import BookingsPage from "../pages/bookings/ui/BookingsPage";
import ProfilePage from "../pages/profile/ui/ProfilePage";
import { useClubApp } from "./model/useClubApp";

export default function App() {
  const app = useClubApp();
  const [authOpen, setAuthOpen] = useState(false), [authMode, setAuthMode] = useState<"login" | "register">("login"), [bookingOpen, setBookingOpen] = useState(false), [helpOpen, setHelpOpen] = useState(false), [promo, setPromo] = useState("");
  const openLogin = () => { setAuthMode("login"); setAuthOpen(true); };
  const openBooking = () => { if (!app.client) return openLogin(); setBookingOpen(true); };
  const authenticated = async (client: Client, token: string) => { localStorage.setItem("ctrl-token", token); app.setClient(client); setAuthOpen(false); await app.refresh(); };
  const navigate = (page: string) => app.navigate(page as typeof app.page);
  return <div className="app-shell"><SiteHeader page={app.page} client={app.client} onNavigate={navigate} onRegister={() => { setAuthMode("register"); setAuthOpen(true); }} onLogin={openLogin} /><main id="main-content"><div className="content">{app.error && <Alert severity="error" action={<Button onClick={() => void app.refresh()}>Повторить</Button>}>{app.error}</Alert>}{app.page === "club" && <ClubPage devices={app.computers} layout={app.layout} selected={app.selected} filter={app.filter} loading={app.loading} onChoose={app.choose} onFilter={app.setFilter} onClear={() => app.setSelected([])} onBook={openBooking} />}{app.page === "tariffs" && <TariffsPage tariffs={app.tariffs} devices={app.computers} onChoose={(tariff) => { app.setFilter(tariff); app.navigate("club"); }} />}{app.page === "bookings" && <BookingsPage client={app.client} bookings={app.bookings} sessions={app.sessions} computers={app.computers} promo={promo} busy={app.busy} onLogin={openLogin} onPromoChange={setPromo} onAction={app.action} onChoosePlace={() => app.navigate("club")} />}{app.page === "profile" && <ProfilePage client={app.client} busy={app.busy} onLogin={openLogin} onSave={(data) => void app.action(() => updateProfile(data), "Профиль обновлён")} onLogout={app.logout} />}</div></main><SiteFooter onNavigate={navigate} onHelp={() => setHelpOpen(true)} /><HelpWidget open={helpOpen} onClose={() => setHelpOpen(false)} onOpen={() => setHelpOpen(true)} /><AuthDialog open={authOpen} initialMode={authMode} busy={app.busy} onClose={() => setAuthOpen(false)} onSuccess={authenticated} onMessage={app.setToast} /><BookingDialog open={bookingOpen} selected={app.selected} busy={app.busy} onClose={() => setBookingOpen(false)} onBooked={() => { setBookingOpen(false); app.setSelected([]); app.navigate("bookings"); void app.refresh(); app.setToast("Бронь создана. Можно перейти к оплате."); }} /><Snackbar open={!!app.toast} autoHideDuration={5_000} onClose={() => app.setToast("")} message={app.toast} /></div>;
}
