import type React from "react";
export default function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    map: (
      <>
        <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zm6-2v16m6-14v16" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    gamepad: (
      <>
        <path d="M7 7h10q3 0 4 5l1 5q0 4-4 1l-2-2H8l-2 2q-4 3-4-1l1-5q1-5 4-5Z" />
        <path d="M6 11v4m-2-2h4m8-2h.1m2 3h.1" />
      </>
    ),
    arcade: (
      <>
        <path d="M6 2h12l2 6-2 8 2 6H4l2-6-2-8Zm0 6h12M6 16h12" />
        <path d="M8 5h8m-7 7v2m6-1h.1" />
      </>
    ),
    vr: (
      <>
        <path d="M5 7h14q3 0 3 4v5q0 3-4 2l-4-2h-4l-4 2q-4 1-4-2v-5q0-4 3-4Z" />
        <path d="M6 11h4v3H6zm8 0h4v3h-4zM8 7V4h8v3" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    monitor: (
      <>
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M8 21h8m-4-5v5" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 11h18m-14 5h3" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-8z" />,
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 8h18m0 5h-6v4h6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
    logout: (
      <>
        <path d="M9 3H4v18h5m4-14 5 5-5 5m-5-5h13" />
      </>
    ),
    headset: (
      <>
        <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h4v-7zm16 0h2v7h-4v-7zm0 7q0 3-7 3" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}
