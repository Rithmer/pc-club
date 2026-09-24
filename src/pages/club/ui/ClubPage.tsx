import { Button } from "@mui/material";
import DeviceCatalog from "../../../features/device-selection/ui/DeviceCatalog";
import type { ClubLayout, Computer } from "../../../shared/api/contracts";

interface Props {
  devices: Computer[];
  layout: ClubLayout | null;
  selected: Computer[];
  filter: string;
  loading: boolean;
  onChoose: (pc: Computer) => void;
  onFilter: (filter: string) => void;
  onClear: () => void;
  onBook: () => void;
}
export default function ClubPage({
  devices,
  layout,
  selected,
  filter,
  loading,
  onChoose,
  onFilter,
  onClear,
  onBook,
}: Props) {
  return (
    <>
      <DeviceCatalog
        devices={devices}
        layout={layout}
        selected={selected}
        onChoose={onChoose}
        filter={filter}
        setFilter={onFilter}
        loading={loading}
      />
      {selected.length > 0 && (
        <div className="booking-bar">
          <div>
            <strong>Выбрано мест: {selected.length}</strong>
            <span>{selected.map((pc) => pc.name).join(" · ")}</span>
          </div>
          <button className="text-button" onClick={onClear}>
            Сбросить
          </button>
          <Button variant="contained" onClick={onBook}>
            Забронировать
          </Button>
        </div>
      )}
    </>
  );
}
