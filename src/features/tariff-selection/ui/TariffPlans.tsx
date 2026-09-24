import { useState } from "react";
import { Button } from "@mui/material";
import type { Computer, Tariff } from "../../../shared/api/contracts";
import Icon from "../../../shared/ui/Icon";
export default function TariffPlans({
  tariffs,
  devices,
  onChoose,
}: {
  tariffs: Tariff[];
  devices: Computer[];
  onChoose: (tariff: string) => void;
}) {
  const [category, setCategory] = useState("pc");
  const shown = tariffs.filter((t) =>
    category === "pc" ? t.deviceType === "pc" : t.deviceType !== "pc",
  );
  return (
    <section className="plans-section">
      <h1>Твой формат игры</h1>
      <div className="plans-toggle" role="group" aria-label="Категория тарифов">
        <span
          className={`plans-toggle-indicator ${category}`}
          aria-hidden="true"
        />
        <button
          className={category === "pc" ? "active" : ""}
          aria-pressed={category === "pc"}
          onClick={() => setCategory("pc")}
        >
          Компьютеры
        </button>
        <button
          className={category === "fun" ? "active" : ""}
          aria-pressed={category === "fun"}
          onClick={() => setCategory("fun")}
        >
          Развлечения
        </button>
      </div>
      <div className="plan-grid" key={category}>
        {shown.map((t, i) => {
          const d = devices.find((d) => d.tariff === t.id);
          const features =
            t.deviceType === "pc"
              ? [
                  ["monitor", d?.gpu ?? "Игровой ПК"],
                  ["bolt", d?.cpu ?? ""],
                  ["grid", d?.ram ?? ""],
                  ["monitor", d?.monitor ?? ""],
                  ["user", d?.zone ?? ""],
                ]
              : [
                  [
                    t.deviceType === "ps" ? "gamepad" : t.deviceType,
                    d?.name ?? t.name,
                  ],
                  ["monitor", d?.monitor ?? ""],
                  ...(d?.features ?? []).map((f) => ["check", f]),
                ];
          return (
            <article
              key={t.id}
              className={`plan-card ${i === 1 ? "featured" : ""}`}
            >
              <div className="plan-top">
                <h2>{t.name}</h2>
                {i === 1 && <span>Популярный</span>}
              </div>
              <div className="plan-price">
                <sup>₽</sup>
                <strong>{t.pricePerHour}</strong>
                <span>
                  за место
                  <br />в час
                </span>
              </div>
              <p>{t.description}</p>
              <Button
                fullWidth
                variant={i === 0 ? "outlined" : "contained"}
                onClick={() => onChoose(t.id)}
              >
                Выбрать {t.name}
              </Button>
              <ul>
                {features
                  .filter(([, text]) => text)
                  .map(([icon, text]) => (
                    <li key={text}>
                      <Icon name={icon} size={19} />
                      <span>{text}</span>
                    </li>
                  ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
