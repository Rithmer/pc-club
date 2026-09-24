import { Button, Chip, TextField } from "@mui/material";
import type { Booking, Client, Computer, Session } from "../../../shared/api/contracts";
import { money } from "../../../shared/lib/format";
import { applyPromo, payOnline, confirmBooking, payCash, startSession, cancelBooking, extendSession, finishSession } from "../api/bookingActionsApi";
import { BOOKING_STATUS_LABELS, ACTIONABLE_BOOKING_STATUSES, SESSION_EXTENSION_HOURS } from "../config/constants";

interface Props {
  client: Client;
  bookings: Booking[];
  sessions: Session[];
  computers: Computer[];
  promo: string;
  busy: boolean;
  onPromoChange: (value: string) => void;
  onAction: (request: () => Promise<unknown>, message: string) => void;
  onChoosePlace: () => void;
}

export default function BookingsContent(props: Props) {
  const name = (id: string) =>
    props.computers.find((pc) => pc.id === id)?.name ?? id;
  return (
    <>
      {props.bookings.length === 0 ? (
        <div className="empty">
          <h3>Время запланировать игру</h3>
          <p>Выбранные места появятся здесь.</p>
          <Button variant="contained" onClick={props.onChoosePlace}>
            Выбрать место
          </Button>
        </div>
      ) : (
        <div className="booking-list">
          {[...props.bookings].reverse().map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div>
                <Chip
                  size="small"
                  label={BOOKING_STATUS_LABELS[booking.status] ?? booking.status}
                />
                <h3>{booking.computerIds.map(name).join(", ")}</h3>
                <p>
                  {new Date(booking.startAt).toLocaleString("ru-RU", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  · {booking.duration} ч.
                </p>
                <strong>
                  {money(booking.total)} ·{" "}
                  {booking.paid ? "Оплата отмечена (демо)" : "Ожидает оплаты"}
                </strong>
              </div>
              <div className="booking-actions">
                {ACTIONABLE_BOOKING_STATUSES.includes(booking.status) && (
                  <>
                    {!booking.paid && (
                      <>
                        <TextField
                          size="small"
                          label="Промокод"
                          value={props.promo}
                          onChange={(event) =>
                            props.onPromoChange(event.target.value)
                          }
                        />
                        <Button
                          disabled={props.busy}
                          onClick={() =>
                            props.onAction(
                              () => applyPromo(booking.id, props.promo),
                              "Промокод применён",
                            )
                          }
                        >
                          Применить
                        </Button>
                        <Button
                          variant="contained"
                          disabled={props.busy}
                          onClick={() =>
                            props.onAction(
                              () => payOnline(booking.id),
                              "Демо-оплата отмечена",
                            )
                          }
                        >
                          Демо-оплата
                        </Button>
                      </>
                    )}
                    {props.client.role === "admin" && (
                      <>
                        <Button
                          disabled={props.busy}
                          onClick={() =>
                            props.onAction(
                              () => confirmBooking(booking.id),
                              "Бронь подтверждена",
                            )
                          }
                        >
                          Подтвердить
                        </Button>
                        {!booking.paid ? (
                          <Button
                            disabled={props.busy}
                            onClick={() =>
                              props.onAction(
                                () => payCash(booking.id),
                                "Оплата наличными отмечена",
                              )
                            }
                          >
                            Наличные
                          </Button>
                        ) : (
                          <Button
                            disabled={props.busy}
                            onClick={() =>
                              props.onAction(
                                () => startSession(booking.id),
                                "Сессия началась",
                              )
                            }
                          >
                            Начать сессию
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      color="inherit"
                      disabled={props.busy}
                      onClick={() =>
                        props.onAction(
                          () => cancelBooking(booking.id),
                          "Бронь отменена",
                        )
                      }
                    >
                      Отменить
                    </Button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      {props.sessions.length > 0 && (
        <>
          <h2>Сейчас в игре</h2>
          {props.sessions.map((session) => (
            <article className="booking-card" key={session.id}>
              <div>
                <h3>{name(session.computerId)}</h3>
                <p>
                  До {new Date(session.endAt).toLocaleTimeString("ru-RU")} ·
                  осталось {Math.ceil(session.remainingSeconds / 60)} мин.
                </p>
              </div>
              <div>
                <Button
                  disabled={props.busy}
                  onClick={() =>
                    props.onAction(
                      () => extendSession(session.id, SESSION_EXTENSION_HOURS),
                      "Сессия продлена",
                    )
                  }
                >
                  Продлить на час
                </Button>
                <Button
                  disabled={props.busy}
                  onClick={() =>
                    props.onAction(
                      () => finishSession(session.id),
                      "Сессия завершена",
                    )
                  }
                >
                  Завершить
                </Button>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  );
}
