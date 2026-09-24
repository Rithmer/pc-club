import { Button, CircularProgress } from "@mui/material";
import type { ClubLayout, Computer } from "../../../shared/api/contracts";
import ClubMap from "./ClubMap";
import DeviceArt from "../../../entities/device/ui/DeviceArt";
import Icon from "../../../shared/ui/Icon";
import { AVAILABILITY_FILTERS, DEVICE_CATEGORIES } from "../config/constants";
import { useCatalogView } from "../model/useCatalogView";
export default function DeviceCatalog({
  devices,
  layout,
  selected,
  onChoose,
  filter,
  setFilter,
  loading,
}: {
  devices: Computer[];
  layout: ClubLayout | null;
  selected: Computer[];
  onChoose: (device: Computer) => void;
  filter: string;
  setFilter: (filter: string) => void;
  loading: boolean;
}) {
  const {
    view,
    setView,
    availability,
    setAvailability,
    filtered,
    catalogDevices,
    activeFilter,
  } = useCatalogView(devices, filter);
  return (
    <section id="catalog" className="device-section">
      <div className="catalog-heading">
        <h1>
          Выбирай, во что играть<span>.</span>
        </h1>
        <div className="mode-switch" role="group" aria-label="Режим просмотра">
          <button
            className={view === "catalog" ? "active" : ""}
            aria-pressed={view === "catalog"}
            onClick={() => setView("catalog")}
          >
            <Icon name="grid" size={18} />
            Каталог
          </button>
          <button
            className={view === "map" ? "active" : ""}
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <Icon name="map" size={18} />
            Карта
          </button>
        </div>
      </div>
      <div className="catalog-filters">
        <div className="filter-group">
          <span className="filter-label">Устройство</span>
          <div className="category-tabs" aria-label="Тип устройства">
            {DEVICE_CATEGORIES.map(([id, label, icon]) => (
              <button
                className={activeFilter === id ? "active" : ""}
                key={id}
                aria-pressed={activeFilter === id}
                onClick={() => setFilter(id)}
              >
                <Icon name={icon} size={17} />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">Статус</span>
          <div className="availability-tabs" aria-label="Статус устройства">
            {AVAILABILITY_FILTERS.map(([id, label]) => (
              <button
                key={id}
                className={availability === id ? "active" : ""}
                aria-pressed={availability === id}
                onClick={() => setAvailability(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="empty">
          <CircularProgress />
        </div>
      ) : view === "map" ? (
        layout ? (
          <ClubMap
            layout={layout}
            devices={devices}
            visibleIds={new Set(filtered.map((d) => d.id))}
            selected={selected}
            onChoose={onChoose}
          />
        ) : (
          <div className="empty">
            Карта недоступна. Попробуй обновить страницу.
          </div>
        )
      ) : filtered.length === 0 ? (
        <div className="empty">Нет подходящих мест</div>
      ) : (
        <div className="device-grid">
          {catalogDevices.map((d) => {
            const chosen = selected.some((s) => s.id === d.id);
            return (
              <article
                key={d.id}
                className={`device-card ${chosen ? "chosen" : ""}`}
              >
                <div className={`device-visual visual-${d.deviceType}`}>
                  <DeviceArt type={d.deviceType} />
                </div>
                <div className="device-info">
                  <div className="device-title">
                    <h2>{d.name}</h2>
                    <span>
                      {d.pricePerHour} ₽<small> / ч</small>
                    </span>
                  </div>
                  <p>
                    {d.deviceType === "pc"
                      ? `${d.gpu} · ${d.monitor.split(" · ")[1]}`
                      : d.cpu}
                  </p>
                  <Button
                    fullWidth
                    variant={chosen ? "contained" : "outlined"}
                    disabled={d.status !== "free"}
                    onClick={() => onChoose(d)}
                    aria-pressed={chosen}
                  >
                    {chosen ? (
                      <>
                        <Icon name="check" size={17} />
                        Выбрано
                      </>
                    ) : d.status === "free" ? (
                      "Выбрать"
                    ) : (
                      "Недоступно"
                    )}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
