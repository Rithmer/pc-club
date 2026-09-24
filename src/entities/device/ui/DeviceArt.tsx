import type { DeviceType } from "../../../shared/api/contracts";
export default function DeviceArt({ type }: { type: DeviceType }) {
  return (
    <svg
      className={`device-art art-${type}`}
      viewBox="0 0 280 170"
      fill="none"
      aria-hidden="true"
    >
      <ellipse className="art-shadow" cx="140" cy="149" rx="92" ry="9" />
      {type === "pc" ? (
        <>
          <rect
            className="art-panel"
            x="42"
            y="28"
            width="148"
            height="91"
            rx="8"
          />
          <rect
            className="art-screen"
            x="49"
            y="35"
            width="134"
            height="76"
            rx="4"
          />
          <path className="art-wave" d="m49 89 48-37 43 38 43-49v70H49Z" />
          <path className="art-highlight" d="m53 95 44-36 43 39 38-48" />
          <path className="art-body" d="M107 120h18l4 17H103Z" />
          <rect
            className="art-edge"
            x="93"
            y="137"
            width="46"
            height="5"
            rx="2.5"
          />
          <rect
            className="art-panel"
            x="203"
            y="42"
            width="37"
            height="99"
            rx="6"
          />
          <circle className="art-ring" cx="221.5" cy="71" r="11" />
          <circle className="art-ring" cx="221.5" cy="104" r="11" />
          <circle className="art-highlight" cx="221.5" cy="71" r="3" />
          <circle className="art-highlight" cx="221.5" cy="104" r="3" />
          <path className="art-body" d="m67 141 100 0 13 12H53Z" />
          <path className="art-key" d="M71 144h90m-95 4h101" />
          <ellipse className="art-panel" cx="192" cy="147" rx="9" ry="7" />
        </>
      ) : type === "ps" ? (
        <>
          <path
            className="art-panel"
            d="M166 20q24 4 32-3l-3 121q-14 9-37 0Z"
          />
          <path className="art-body" d="m179 23 7-1-1 116h-14Z" />
          <path className="art-highlight" d="m169 25-7 108m30-108-2 108" />
          <rect
            className="art-edge"
            x="154"
            y="137"
            width="50"
            height="6"
            rx="3"
          />
          <path
            className="art-panel"
            d="M70 82h56q12 0 17 21l7 22q4 26-16 11l-14-14H76l-14 14q-21 15-16-11l7-22q5-21 17-21Z"
          />
          <path className="art-body" d="M81 84h34l-3 20H84Z" />
          <path className="art-key" d="M65 94v17m-8-9h16" />
          <circle className="art-ring" cx="85" cy="114" r="7" />
          <circle className="art-ring" cx="111" cy="114" r="7" />
          <circle className="art-accent" cx="130" cy="98" r="3" />
          <circle className="art-accent" cx="123" cy="105" r="3" />
          <circle className="art-accent" cx="137" cy="105" r="3" />
          <circle className="art-accent" cx="130" cy="112" r="3" />
        </>
      ) : type === "arcade" ? (
        <>
          <path
            className="art-body"
            d="m119 18 57 0 18 26-10 58 8 44H93l9-44-10-58Z"
          />
          <path
            className="art-panel"
            d="M107 18h59l14 26-9 48 12 13-3 41H93l-3-41 14-13-11-48Z"
          />
          <rect
            className="art-accent"
            x="104"
            y="25"
            width="63"
            height="12"
            rx="3"
          />
          <path className="art-screen" d="m106 45 59 0-6 40h-47Z" />
          <path className="art-highlight" d="m118 70 11-11 9 12 11-15" />
          <path className="art-body" d="m104 94 67 0 12 12H90Z" />
          <path className="art-key" d="M114 96v-8" />
          <circle className="art-accent" cx="114" cy="87" r="4" />
          <circle className="art-accent" cx="146" cy="100" r="3" />
          <circle className="art-accent" cx="158" cy="100" r="3" />
          <rect
            className="art-body"
            x="113"
            y="116"
            width="42"
            height="18"
            rx="4"
          />
          <path className="art-key" d="M125 122h18" />
        </>
      ) : (
        <>
          <path
            className="art-edge"
            d="M83 76V52q0-30 57-30t57 30v24h-13V55q0-19-44-19t-44 19v21Z"
          />
          <path
            className="art-panel"
            d="M78 67h124q13 0 13 17v27q0 19-20 14l-43-11h-24l-43 11q-20 5-20-14V84q0-17 13-17Z"
          />
          <rect
            className="art-body"
            x="81"
            y="77"
            width="116"
            height="24"
            rx="12"
          />
          <rect
            className="art-accent"
            x="97"
            y="82"
            width="7"
            height="14"
            rx="3.5"
          />
          <rect
            className="art-accent"
            x="136"
            y="82"
            width="7"
            height="14"
            rx="3.5"
          />
          <rect
            className="art-accent"
            x="175"
            y="82"
            width="7"
            height="14"
            rx="3.5"
          />
          <path className="art-panel" d="m46 109 12 3-4 34q-2 10-11 4Z" />
          <ellipse className="art-ring" cx="52" cy="109" rx="14" ry="11" />
          <path className="art-panel" d="m234 109-12 3 4 34q2 10 11 4Z" />
          <ellipse className="art-ring" cx="228" cy="109" rx="14" ry="11" />
        </>
      )}
    </svg>
  );
}
