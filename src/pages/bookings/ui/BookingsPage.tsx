import type {
  Booking,
  Client,
  Computer,
  Session,
} from "../../../shared/api/contracts";
import BookingsContent from "../../../features/booking-management/ui/BookingsContent";
import LoginRequired from "../../../shared/ui/LoginRequired";
import PageTitle from "../../../shared/ui/PageTitle";
export default function BookingsPage(props: {
  client: Client | null;
  bookings: Booking[];
  sessions: Session[];
  computers: Computer[];
  promo: string;
  busy: boolean;
  onLogin: () => void;
  onPromoChange: (value: string) => void;
  onAction: (request: () => Promise<unknown>, message: string) => void;
  onChoosePlace: () => void;
}) {
  const { client, ...rest } = props;
  return (
    <>
      <PageTitle
        title={
          client?.role === "admin" ? "Бронирования клуба" : "Мои бронирования"
        }
        text="Все планы на игру — в одном месте."
      />
      {client ? (
        <BookingsContent client={client} {...rest} />
      ) : (
        <LoginRequired onLogin={props.onLogin} />
      )}
    </>
  );
}
