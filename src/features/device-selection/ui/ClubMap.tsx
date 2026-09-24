import { Button } from "@mui/material";
import type { ClubLayout, Computer } from "../../../shared/api/contracts";
import Icon from "../../../shared/ui/Icon";
export const deviceIcon = (device: Computer) =>
  ({ pc: "monitor", ps: "gamepad", arcade: "arcade", vr: "vr" })[
    device.deviceType
  ];
const statusNames: Record<string, string> = {
  free: "Свободно",
  busy: "Занято",
  reserved: "Забронировано",
  maintenance: "Обслуживание",
};
export default function ClubMap({
  layout,
  devices,
  visibleIds,
  selected,
  onChoose,
}: {
  layout: ClubLayout;
  devices: Computer[];
  visibleIds: Set<string>;
  selected: Computer[];
  onChoose: (device: Computer) => void;
}) {
  const unplaced = devices.filter(
    (d) => !layout.rooms.some((r) => r.zone === d.zone),
  );
  return (
    <div className="club-map">
      <div className="map-toolbar">
        <div className="map-legend">
          <span>
            <i className="free" />
            Свободно
          </span>
          <span>
            <i className="selected" />
            Выбрано
          </span>
          <span>
            <i className="unavailable" />
            Недоступно
          </span>
        </div>
      </div>
      <div
        className="map-scroll"
        tabIndex={0}
        role="region"
        aria-label="Карта клуба, прокручивается по горизонтали"
      >
        <svg
          className="building-map"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          aria-label="План игрового клуба"
        >
          <path className="building-outline" d={layout.outline} />
          <path className="map-walkway" d="M475 400H900M615 290v140" />
          <g className="reception">
            <rect x="524" y="314" width="182" height="48" rx="10" />
            <text x="615" y="343" textAnchor="middle">
              Ресепшн
            </text>
            <path d="M544 324h50" />
          </g>
          <path className="entry-gap" d="M895 580h64" />
          <path className="map-door" d="M895 580v-64q64 0 64 64" />
          <text className="map-entry" x="926" y="610" textAnchor="middle">
            Вход ↑
          </text>
          {layout.rooms.map((room) => {
            const roomDevices = devices.filter((d) => d.zone === room.zone);
            return (
              <g key={room.id}>
                <rect
                  className={`map-room room-${room.id}`}
                  x={room.x}
                  y={room.y}
                  width={room.width}
                  height={room.height}
                  rx="10"
                />
                <text className="room-label" x={room.x + 22} y={room.y + 33}>
                  {room.name}
                </text>
                <path
                  className="room-door-gap"
                  d={`M${room.x + room.width - 76} ${room.y + room.height}h48`}
                />
                <path
                  className="map-door"
                  d={`M${room.x + room.width - 76} ${room.y + room.height}v-48q48 0 48 48`}
                />
                {roomDevices.map((d, i) => {
                  const chosen = selected.some((s) => s.id === d.id),
                    visible = visibleIds.has(d.id),
                    disabled = d.status !== "free" || !visible;
                  return (
                    <g
                      key={d.id}
                      transform={`translate(${room.x + room.seatX + (i % room.columns) * room.gapX} ${room.y + room.seatY + Math.floor(i / room.columns) * room.gapY})`}
                      className={`map-device ${chosen ? "is-selected" : ""} ${d.status !== "free" ? "is-unavailable" : ""} ${!visible ? "is-filtered" : ""}`}
                      role="button"
                      tabIndex={disabled ? -1 : 0}
                      aria-label={`${d.name}, ${room.name}, ${statusNames[d.status] ?? d.status}`}
                      aria-pressed={chosen}
                      aria-disabled={disabled}
                      onClick={() => !disabled && onChoose(d)}
                      onKeyDown={(e) => {
                        if (!disabled && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          onChoose(d);
                        }
                      }}
                    >
                      <title>
                        {d.name} · {d.pricePerHour} ₽/час ·{" "}
                        {statusNames[d.status]}
                      </title>
                      <rect width="52" height="52" rx="9" />
                      <g transform="translate(15 7)">
                        <Icon
                          name={chosen ? "check" : deviceIcon(d)}
                          size={22}
                        />
                      </g>
                      <text x="26" y="43" textAnchor="middle">
                        {d.name.match(/\d+$/)?.[0] ?? d.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <span className="map-mobile-hint">
        Проведи в сторону, чтобы увидеть весь зал
      </span>
      {unplaced.length > 0 && (
        <div className="unplaced-devices">
          <span>Ещё не размещены на карте:</span>
          {unplaced.map((d) => (
            <Button
              key={d.id}
              disabled={d.status !== "free" || !visibleIds.has(d.id)}
              onClick={() => onChoose(d)}
            >
              {d.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
