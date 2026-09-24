export const DEVICE_CATEGORIES = [
  ["all", "Всё", "grid"],
  ["pc", "ПК", "monitor"],
  ["ps", "PlayStation", "gamepad"],
  ["arcade", "Автоматы", "arcade"],
  ["vr", "VR", "vr"],
] as const;
export const AVAILABILITY_FILTERS = [
  ["free", "Свободные"],
  ["reserved", "Забронированные"],
  ["maintenance", "Обслуживание"],
] as const;
export const DEVICE_TYPES = ["pc", "ps", "arcade", "vr"] as const;
