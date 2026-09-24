import TariffPlans from "../../../features/tariff-selection/ui/TariffPlans";
import type { Computer, Tariff } from "../../../shared/api/contracts";
export default function TariffsPage({
  tariffs,
  devices,
  onChoose,
}: {
  tariffs: Tariff[];
  devices: Computer[];
  onChoose: (tariff: string) => void;
}) {
  return (
    <TariffPlans tariffs={tariffs} devices={devices} onChoose={onChoose} />
  );
}
