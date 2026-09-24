import type { Client } from "../../../shared/api/contracts";
import ProfileContent from "../../../features/profile-management/ui/ProfileContent";
import LoginRequired from "../../../shared/ui/LoginRequired";
import PageTitle from "../../../shared/ui/PageTitle";
export default function ProfilePage({
  client,
  busy,
  onLogin,
  onSave,
  onLogout,
}: {
  client: Client | null;
  busy: boolean;
  onLogin: () => void;
  onSave: (data: { fullName: string; email: string }) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <PageTitle
        title="Личный кабинет"
        text="Твой профиль, баланс и доступ к клубу."
      />
      {client ? (
        <ProfileContent
          client={client}
          busy={busy}
          onSave={onSave}
          onLogout={onLogout}
        />
      ) : (
        <LoginRequired onLogin={onLogin} />
      )}
    </>
  );
}
