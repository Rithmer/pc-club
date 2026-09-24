export type DeviceType = "pc" | "ps" | "arcade" | "vr";
export interface Computer {
  deviceType: DeviceType;
  features?: string[];
  id: string;
  name: string;
  zone: string;
  tariff: string;
  status: string;
  gpu: string;
  cpu: string;
  ram: string;
  monitor: string;
  pricePerHour: number;
}
export interface Client {
  id: string;
  fullName: string;
  email: string;
  balance: number;
  role: string;
}
export interface Booking {
  id: string;
  computerIds: string[];
  startAt: string;
  endAt: string;
  duration: number;
  total: number;
  status: string;
  paid: boolean;
  clientId: string;
}
export interface Session {
  id: string;
  computerId: string;
  remainingSeconds: number;
  endAt: string;
}
export interface Tariff {
  deviceType: DeviceType;
  id: string;
  name: string;
  pricePerHour: number;
  description: string;
}
export interface ClubRoom {
  id: string;
  name: string;
  zone: string;
  x: number;
  y: number;
  width: number;
  height: number;
  columns: number;
  seatX: number;
  seatY: number;
  gapX: number;
  gapY: number;
}
export interface ClubLayout {
  width: number;
  height: number;
  outline: string;
  rooms: ClubRoom[];
}
